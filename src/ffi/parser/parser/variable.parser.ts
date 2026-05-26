import { type ClangNode, type CVarDecl, DeclarationKind } from '../../ast';
import { extractNodeLocation, parseCTypeDeclFromString } from '../utility';

export function parseVarDecl(node: ClangNode): CVarDecl | null {
  if (!node.name) return null;

  const loc = extractNodeLocation(node);

  return {
    kind: DeclarationKind.VAR,
    name: node.name,
    type: parseCTypeDeclFromString(
      node.type?.desugaredQualType ?? node.type?.qualType ?? ''
    ),
    loc,
    doc: null,
  };
}
