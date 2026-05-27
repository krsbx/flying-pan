import type {
  CFunctionParam,
  ClangLoc,
  ClangNode,
  CTypeDecl,
} from '../ast/types';
import { CDeclarationKind } from '../ast/utility';
import { CType } from '../codegen/utility';

export function parseCTypeDeclFromString(qualType: string): CTypeDecl {
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

export function parseReturnTypeFromQualType(qualType: string): CTypeDecl {
  const parenIdx = findTopLevelParent(qualType);

  if (parenIdx === -1) {
    return parseCTypeDeclFromString(qualType.trim());
  }

  const returnStr = qualType.slice(0, parenIdx).trim();

  return parseCTypeDeclFromString(returnStr);
}

export function parseParams(inner: ClangNode[]): CFunctionParam[] {
  const params = inner.filter((n) => n.kind === CDeclarationKind.PARM_VAL_DECL);

  return params.map((node, i) => ({
    type: parseCTypeDeclFromString(
      node.type?.desugaredQualType ?? node.type?.qualType ?? ''
    ),
    name: node.name || `arg${i}`,
  }));
}

export function parseFunctionPointerParams(qualType: string) {
  const paramsMatch = qualType.match(/\*\)\s*\((.+)\)/);
  const params: CFunctionParam[] = [];

  if (!paramsMatch) return params;

  const paramTypes = splitTopLevelCommas(paramsMatch[1]!);

  for (const pt of paramTypes) {
    const trimmed = pt.trim();

    // C's `void` param means no parameters
    if (trimmed === CType.VOID) continue;

    params.push({
      type: parseCTypeDeclFromString(trimmed),
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

/** Walk a ClangLoc tree to find any `includedFrom.file` */
export function findIncludedFrom(
  l: ClangLoc | null | undefined
): string | null {
  if (!l) return null;
  if (l.includedFrom?.file) return l.includedFrom.file;

  return findIncludedFrom(l.spellingLoc) ?? findIncludedFrom(l.expansionLoc);
}
