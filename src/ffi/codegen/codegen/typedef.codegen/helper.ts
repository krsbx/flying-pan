import type { CFunctionPointerDecl, CTypedefDecl } from '../../../ast/types';
import { cTypeToTsType, normalizeTypeName } from '../../utility';

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
  typeNames: string;
  enumNames: Set<string>;
}): string {
  const baseName = normalizeTypeName(options.typeNames);

  if (options.enumNames.has(baseName)) {
    return baseName;
  }

  return cTypeToTsType({
    name: options.typeNames,
    isConst: false,
    pointerDepth: 0,
    arraySize: null,
  });
}
