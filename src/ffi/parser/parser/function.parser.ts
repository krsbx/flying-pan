import { type CFunctionDecl, type ClangNode, DeclarationKind } from '../../ast';
import {
  extractDoc,
  extractNodeLocation,
  parseParams,
  parseReturnTypeFromQualType,
} from '../utility';

export function parseFunctionDecl(node: ClangNode): CFunctionDecl | null {
  if (!node.name) return null;

  const qualType = node.type?.desugaredQualType ?? node.type?.qualType ?? '';
  const returnType = parseReturnTypeFromQualType(qualType);
  const params = parseParams(node.inner ?? []);
  const loc = extractNodeLocation(node);
  const doc = extractDoc(node.inner);

  return {
    kind: DeclarationKind.FUNCTION,
    name: node.name,
    returnType,
    params,
    loc,
    doc,
  };
}
