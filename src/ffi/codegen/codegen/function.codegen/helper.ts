import type { CTypeDecl } from '../../../ast/types';
import {
  CType,
  TypeScriptType,
  cTypeToTsType,
  normalizeTypeName,
} from '../../utility';

const pointerReturnType = [TypeScriptType.POINTER, TypeScriptType.NULL];

const pointerParamType = [
  TypeScriptType.POINTER,
  TypeScriptType.TYPED_ARRAY,
  TypeScriptType.NULL,
];

export function resolveReturnType(options: {
  cType: CTypeDecl;
  enumNames: Set<string>;
}): string {
  const baseName = normalizeTypeName(options.cType.name);

  if (
    options.cType.pointerDepth === 1 &&
    options.cType.isConst &&
    baseName === CType.CHAR
  ) {
    return TypeScriptType.CSTRING;
  }

  if (options.cType.pointerDepth > 0 || options.cType.arraySize !== null) {
    const tsType = cTypeToTsType(options.cType);

    return tsType === TypeScriptType.POINTER
      ? pointerReturnType.join(' | ')
      : tsType;
  }

  if (options.enumNames.has(baseName)) {
    return baseName;
  }

  const tsType = cTypeToTsType(options.cType);

  return tsType === TypeScriptType.POINTER
    ? pointerReturnType.join(' | ')
    : tsType;
}

export interface ResolvedParam {
  /** The TS type code for the param declaration */
  code: string;
  /** If non-null, this type name must be imported from ./types */
  typeName: string | null;
}

export function resolveParamType(options: {
  cType: CTypeDecl;
  enumNames: Set<string>;
}): ResolvedParam {
  if (options.cType.isFunctionPointer) {
    return {
      code: options.cType.name,
      typeName: options.cType.name,
    };
  }

  const baseName = normalizeTypeName(options.cType.name);

  if (options.cType.pointerDepth > 0 || options.cType.arraySize !== null) {
    const tsType = cTypeToTsType(options.cType);

    if (tsType === TypeScriptType.POINTER) {
      return {
        code: pointerParamType.join(' | '),
        typeName: null,
      };
    }

    return {
      code: tsType,
      typeName: null,
    };
  }

  if (options.enumNames.has(baseName)) {
    return {
      code: baseName,
      typeName: null,
    };
  }

  const tsType = cTypeToTsType(options.cType);

  if (tsType === TypeScriptType.POINTER) {
    return {
      code: pointerParamType.join(' | '),
      typeName: null,
    };
  }

  return {
    code: tsType,
    typeName: null,
  };
}
