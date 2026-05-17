import type { CFunctionParam, ClangNode, CType } from '../types/ast';
import { CDeclarationKind } from '../utility';

export function parseCTypeFromString(qualType: string): CType {
  let name = qualType.trim();

  let arraySize: number | null = null;
  const arrayMatch = name.match(/^(.+)\[(\d+)\]$/);
  if (arrayMatch) {
    name = arrayMatch[1]!.trim();
    arraySize = parseInt(arrayMatch[2]!, 10);
  }

  const isConst = name.includes('const ');
  name = name.replace(/\bconst\b/g, '').trim();

  let pointerDepth = 0;
  while (name.endsWith('*')) {
    pointerDepth++;
    name = name.slice(0, -1).trim();
  }

  name = name.trim();

  return {
    name,
    isConst,
    pointerDepth,
    arraySize,
  };
}

function findTopLevelParent(s: string): number {
  let depth = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')') depth++;
    else if (s[i] === '(') {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

export function parseReturnTypeFromQualType(qualType: string): CType {
  const parenIdx = findTopLevelParent(qualType);

  if (parenIdx === -1) {
    return parseCTypeFromString(qualType.trim());
  }

  const returnStr = qualType.slice(0, parenIdx).trim();

  return parseCTypeFromString(returnStr);
}

export function parseParams(inner: ClangNode[]): CFunctionParam[] {
  return inner
    .filter((n) => n.kind === CDeclarationKind.PARM_VAL_DECL)
    .map((node) => ({
      type: parseCTypeFromString(node.type?.qualType ?? ''),
      name: node.name ?? '',
    }));
}

export function parseFunctionPointerParams(qualType: string) {
  const paramsMatch = qualType.match(/\*\)\s*\((.+)\)/);
  const params: CFunctionParam[] = [];

  if (!paramsMatch) return params;

  const paramTypes = splitTopLevelCommas(paramsMatch[1]!);

  for (const pt of paramTypes) {
    params.push({
      type: parseCTypeFromString(pt.trim()),
      name: '',
    });
  }

  return params;
}

export function splitTopLevelCommas(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';

  for (const ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  if (current.trim()) parts.push(current);

  return parts;
}

function collectText(node: ClangNode, out: string[]) {
  if (node.kind === CDeclarationKind.TEXT_COMMENT && node.text) {
    const text = node.text.trim();

    if (text) out.push(text);
  }

  if (node.inner) {
    for (const child of node.inner) {
      collectText(child, out);
    }
  }
}

export function extractDoc(inner: ClangNode[] | null): string | null {
  if (!inner) return null;

  const comment = inner.find((c) => c.kind === CDeclarationKind.FULL_COMMENT);

  if (!comment?.inner) return null;

  for (const child of comment.inner) {
    if (child.kind !== CDeclarationKind.PARAGRAPH_COMMENT) continue;

    const texts: string[] = [];

    collectText(child, texts);

    const doc = texts.join(' ').trim();

    if (doc) return doc;
  }

  return null;
}

export function extractNodeLocation(node: ClangNode) {
  return {
    line: node.loc?.line ?? 0,
    column: node.loc?.col ?? 0,
  };
}

export function isFunctionPointerType(qualType: string): boolean {
  return /\(\*\)/.test(qualType) || /\(\*\s*\w*\s*\)\s*\(/.test(qualType);
}
