import {
  type CFunctionPointerDecl,
  type ClangNode,
  type CTypedefDecl,
  DeclarationKind,
} from '../../ast';
import {
  extractNodeLocation,
  isFunctionPointerType,
  parseCTypeDeclFromString,
  parseFunctionPointerParams,
} from '../utility';

function parseFunctionPointerTypedef(
  node: ClangNode,
  qualType: string
): CFunctionPointerDecl | null {
  if (!node.name) return null;

  const ptrMatch = qualType.match(/^(.+?)\s*\(\*/);

  if (!ptrMatch) return null;

  const returnType = parseCTypeDeclFromString(ptrMatch[1]!.trim());
  const params = parseFunctionPointerParams(qualType);
  const loc = extractNodeLocation(node);

  return {
    kind: DeclarationKind.FUNCTION_POINTER,
    name: node.name,
    returnType,
    params,
    loc,
    doc: null,
  };
}

export function parseTypedefDecl(
  node: ClangNode
): CTypedefDecl | CFunctionPointerDecl | null {
  if (!node.name) return null;

  const qualType = node.type?.desugaredQualType ?? node.type?.qualType ?? '';
  const loc = extractNodeLocation(node);

  if (isFunctionPointerType(qualType)) {
    return parseFunctionPointerTypedef(node, qualType);
  }

  return {
    kind: DeclarationKind.TYPEDEF,
    name: node.name,
    underlyingType: parseCTypeDeclFromString(qualType),
    loc,
    doc: null,
  };
}
