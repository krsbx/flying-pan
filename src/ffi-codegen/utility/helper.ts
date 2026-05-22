import { CStruct } from '@/utility/cstruct';
import { CType, PrimitiveMap } from './constant';

export function normalizeTypeName(name: string): string {
  return name.replace(/^(struct|enum|union|class)\s+/, '');
}

export function primitiveSize(name: string): number {
  return PrimitiveMap[name as CType]?.size ?? CStruct.BYTE_SIZE.ptr;
}
