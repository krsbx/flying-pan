import {
  CDeclarationTag,
  type CFunctionPointerDecl,
  type CTypeDecl,
  type CTypedefDecl,
} from '../../../ast';
import {
  cTypeToTsType,
  normalizeTypeName,
  TypeScriptType,
} from '../../utility';

export function isFuncPointerDecl(
  value: CTypedefDecl['underlyingType']
): value is CFunctionPointerDecl {
  return typeof value === 'object' && 'kind' in value;
}

export function generateFuncPointerTypedef(decl: CTypedefDecl): string {
  const fp = decl.underlyingType as CFunctionPointerDecl;

  const params = fp.params.map((p, i) => {
    const name = p.name || `arg${i}`;
    const tsType = cTypeToTsType(p.type);
    return `${name}: ${tsType}`;
  });

  const returnType = cTypeToTsType(fp.returnType);

  return `export type ${fp.name} = (${params.join(', ')}) => ${returnType};`;
}

export function resolveTypedefType(options: {
  typeDecl: CTypeDecl;
  tag: CDeclarationTag | null;
  enumNames: Set<string>;
}): string {
  const baseName = normalizeTypeName(options.typeDecl.name);

  if (options.enumNames.has(baseName)) {
    return baseName;
  }

  // Use the raw qualType tag to determine the correct TS type
  if (options.tag === CDeclarationTag.ENUM) {
    return TypeScriptType.NUMBER;
  }

  if (
    options.tag === CDeclarationTag.STRUCT ||
    options.tag === CDeclarationTag.UNION
  ) {
    return TypeScriptType.POINTER;
  }

  return cTypeToTsType(options.typeDecl);
}
