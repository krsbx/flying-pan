import { CStruct } from '@/utility/cstruct';
import type { CTypeDecl } from '../../ast/types';
import { CType, PrimitiveMap } from './constant';

export function normalizeTypeName(name: string): string {
  return name
    .replace(/^(struct|enum|union|class)\s+/, '')
    .replace(/^signed\s+/, '');
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
