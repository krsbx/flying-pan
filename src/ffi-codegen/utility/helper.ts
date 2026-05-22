import type { CTypeDecl } from '@/ffi-ast';
import { CStruct } from '@/utility/cstruct';
import { CType, PrimitiveMap } from './constant';

export function normalizeTypeName(name: string): string {
  return name.replace(/^(struct|enum|union|class)\s+/, '');
}

export function primitiveSize(name: string): number {
  return PrimitiveMap[name as CType]?.size ?? CStruct.BYTE_SIZE.ptr;
}

export function resolveStructName(options: {
  cType: CTypeDecl;
  structNames: Set<string>;
}) {
  if (options.cType.pointerDepth > 0 || options.cType.arraySize !== null)
    return null;

  const baseName = normalizeTypeName(options.cType.name);

  return options.structNames.has(baseName) ? baseName : null;
}
