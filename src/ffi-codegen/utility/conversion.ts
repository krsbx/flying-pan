import type { CTypeDecl } from '@/ffi-ast';
import { CStruct } from '@/utility/cstruct';
import type { FFITypeStringToType } from 'bun:ffi';
import type { DataViewMethodInfo } from '../types/codegen';
import {
  CType,
  CTypeToFFIType,
  PrimitiveMap,
  TypeScriptType,
} from './constant';
import { normalizeTypeName } from './helper';

export function cTypeToTsType(cType: CTypeDecl): TypeScriptType {
  const baseName = normalizeTypeName(cType.name);

  if (cType.pointerDepth > 0) {
    if (cType.pointerDepth === 1 && cType.isConst && baseName === CType.CHAR) {
      return TypeScriptType.CSTRING;
    }

    return TypeScriptType.POINTER;
  }

  if (cType.arraySize !== null) {
    return TypeScriptType.POINTER;
  }

  if (baseName === CType.VOID) {
    return TypeScriptType.VOID;
  }

  const primitive = PrimitiveMap[baseName as CType];

  return primitive?.tsType ?? TypeScriptType.POINTER;
}

export function cTypeToFFI(cType: CTypeDecl): keyof FFITypeStringToType {
  const baseName = normalizeTypeName(cType.name);

  if (cType.pointerDepth > 0) {
    if (cType.pointerDepth === 1 && cType.isConst && baseName === CType.CHAR) {
      return 'cstring';
    }

    return 'cstring';
  }

  if (cType.arraySize !== null) {
    return 'ptr';
  }

  return CTypeToFFIType[cType.name as CType] ?? 'ptr';
}

export function cTypeToViewMethod(cType: CTypeDecl): DataViewMethodInfo | null {
  if (cType.pointerDepth > 0) {
    return {
      getter: 'getBigInt64',
      setter: 'setBigInt64',
      size: CStruct.BYTE_SIZE.ptr,
    };
  }

  if (cType.arraySize !== null) {
    return null;
  }

  const primitive = PrimitiveMap[cType.name as CType];

  if (primitive) {
    return {
      getter: `get${primitive.prefix}`,
      setter: `set${primitive.prefix}`,
      size: primitive.size,
    };
  }

  return null;
}

export function primitiveSize(name: string): number {
  return PrimitiveMap[name as CType]?.size ?? CStruct.BYTE_SIZE.ptr;
}

export function cTypeSize(cType: CTypeDecl) {
  if (cType.pointerDepth > 0) return CStruct.BYTE_SIZE.ptr;
  if (cType.arraySize !== null) {
    const elementSize = primitiveSize(cType.name);

    return cType.arraySize * elementSize;
  }

  return primitiveSize(cType.name);
}
