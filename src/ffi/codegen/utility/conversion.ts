import { CStruct } from '@cstruct';
import type { FFITypeStringToType } from 'bun:ffi';
import type { CTypeDecl } from '../../ast/types';
import type { DataViewMethodInfo } from '../types';
import {
  CType,
  CTypeToFFIType,
  PrimitiveMap,
  TypeScriptType,
} from './constant';
import { normalizeTypeName } from './helper';

export type PrimitiveAliasMap = Map<string, string>;

export function cTypeToTsType(
  cType: CTypeDecl,
  aliases?: PrimitiveAliasMap
): TypeScriptType {
  const baseName = normalizeTypeName(cType.name);

  if (cType.pointerDepth > 0) {
    if (cType.pointerDepth === 1 && cType.isConst && baseName === CType.CHAR) {
      return TypeScriptType.STRING;
    }

    return TypeScriptType.POINTER;
  }

  if (cType.arraySize !== null) {
    return TypeScriptType.POINTER;
  }

  if (baseName === CType.VOID) {
    return TypeScriptType.VOID;
  }

  const resolved = aliases?.get(baseName) ?? baseName;
  const primitive = PrimitiveMap[resolved as CType];

  return primitive?.tsType ?? TypeScriptType.POINTER;
}

export function cTypeToFFI(
  cType: CTypeDecl,
  aliases?: PrimitiveAliasMap
): keyof FFITypeStringToType {
  const baseName = normalizeTypeName(cType.name);

  if (cType.pointerDepth > 0) {
    if (cType.pointerDepth === 1 && cType.isConst && baseName === CType.CHAR) {
      return 'cstring';
    }

    return 'ptr';
  }

  if (cType.arraySize !== null) {
    return 'ptr';
  }

  const resolved = aliases?.get(baseName) ?? baseName;

  return CTypeToFFIType[resolved as CType] ?? 'ptr';
}

export function cTypeToViewMethod(
  cType: CTypeDecl,
  aliases?: PrimitiveAliasMap
): DataViewMethodInfo | null {
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

  const baseName = normalizeTypeName(cType.name);
  const resolved = aliases?.get(baseName) ?? baseName;
  const primitive = PrimitiveMap[resolved as CType];

  if (primitive) {
    return {
      getter: `get${primitive.prefix}`,
      setter: `set${primitive.prefix}`,
      size: primitive.size,
    };
  }

  return null;
}
