import type { ClangNode, CVarDecl } from '@/ffi-ast/types/ast';
import { DeclarationKind } from '@/ffi-ast/utility';
import { extractNodeLocation, parseCTypeFromString } from '../utility';

export function parseVarDecl(node: ClangNode): CVarDecl | null {
  if (!node.name) return null;

  const loc = extractNodeLocation(node);

  return {
    kind: DeclarationKind.VAR,
    name: node.name,
    type: parseCTypeFromString(node.type?.qualType ?? ''),
    loc,
    doc: null,
  };
}
