export interface CMacroConst {
  name: string;
  value: string | number;
}

const DEFINE_RE = /^#define\s+(\S+)\s+(.+)$/;

function isNumeric(value: string): boolean {
  // Integer, hex, negative
  if (/^-?\d+$/.test(value)) return true;
  if (/^0x[0-9a-fA-F]+$/.test(value)) return true;
  return false;
}

export function parseMacros(
  source: string,
  options?: { namePrefix?: string }
): CMacroConst[] {
  const prefix = options?.namePrefix;
  const lines = source.split('\n');

  // Pass 1: collect raw name → value map
  const raw = new Map<string, string>();

  for (const line of lines) {
    const match = DEFINE_RE.exec(line);
    if (!match) continue;

    const name = match[1]!;
    const value = match[2]!.trim();

    // Skip names starting with _ or __
    if (name.startsWith('_')) continue;

    // Skip function-like macros: #define FOO(x) ...
    if (name.includes('(')) continue;

    // Filter by prefix if provided
    if (prefix && !name.startsWith(prefix)) continue;

    raw.set(name, value);
  }

  // Pass 2: resolve references — substitute macro names with their values
  const resolved = new Map<string, string | number>();

  for (const [name, value] of raw) {
    let resolvedValue: string | number = value;

    // Try to resolve references to other macros
    // Handles: bare name, bitwise OR of names, parentheses
    const tokens = value.replace(/[()]/g, ' ').split(/\s*\|\s*/);

    let allResolved = true;
    const numericParts: number[] = [];

    for (const token of tokens) {
      const trimmed = token.trim();
      if (!trimmed) continue;

      if (isNumeric(trimmed)) {
        numericParts.push(Number(trimmed));
      } else if (raw.has(trimmed)) {
        const refValue = raw.get(trimmed)!;
        if (isNumeric(refValue)) {
          numericParts.push(Number(refValue));
        } else {
          allResolved = false;
          break;
        }
      } else {
        allResolved = false;
        break;
      }
    }

    if (allResolved && numericParts.length > 0) {
      resolvedValue = numericParts.reduce((a, b) => a | b, 0);
    }

    resolved.set(name, resolvedValue);
  }

  // Build result array
  const results: CMacroConst[] = [];

  for (const [name, value] of resolved) {
    results.push({ name, value });
  }

  return results;
}
