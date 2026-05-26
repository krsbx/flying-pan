import {
  type CDeclarationTag,
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

  const rawQualType = node.type?.qualType ?? '';
  const qualType = node.type?.desugaredQualType ?? rawQualType;
  const loc = extractNodeLocation(node);

  if (isFunctionPointerType(qualType)) {
    return parseFunctionPointerTypedef(node, qualType);
  }

  // Detect enum/struct/union tag from the raw qualType
  let tag: CDeclarationTag | null = null;
  const tagMatch = rawQualType.match(/^(enum|struct|union)\s+/);

  if (tagMatch) {
    tag = tagMatch[1] as CDeclarationTag;
  }

  return {
    kind: DeclarationKind.TYPEDEF,
    name: node.name,
    underlyingType: parseCTypeDeclFromString(qualType),
    tag,
    loc,
    doc: null,
  };
}
