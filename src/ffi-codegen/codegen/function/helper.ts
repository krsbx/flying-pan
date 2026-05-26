import type { CTypeDecl } from '@/ffi-ast';
import { CType, TypeScriptType } from '@/ffi-codegen/utility/constant';
import { cTypeToTsType } from '@/ffi-codegen/utility/conversion';
import { normalizeTypeName } from '@/ffi-codegen/utility/helper';

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

export function resolveParamType(options: {
  cType: CTypeDecl;
  enumNames: Set<string>;
}): string {
  const baseName = normalizeTypeName(options.cType.name);

  if (options.cType.pointerDepth > 0 || options.cType.arraySize !== null) {
    const tsType = cTypeToTsType(options.cType);

    // Pointer params accept null and TypedArray (Bun auto-converts to ptr)
    if (tsType === TypeScriptType.POINTER) {
      return pointerParamType.join(' | ');
    }

    return tsType;
  }

  if (options.enumNames.has(baseName)) {
    return baseName;
  }

  const tsType = cTypeToTsType(options.cType);

  if (tsType === TypeScriptType.POINTER) {
    return pointerParamType.join(' | ');
  }

  return tsType;
}
