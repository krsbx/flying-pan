import type { CTypedefDecl } from '@/ffi-ast';
import type { CodeGenResult } from '@/ffi-codegen/types/codegen';
import { normalizeTypeName } from '@/ffi-codegen/utility/helper';
import {
  generateFuncPointerTypedef,
  isFuncPointerDecl,
  resolveTypedefType,
} from './helper';

export function generateTypedefCode(options: {
  decl: CTypedefDecl;
  enumNames: Set<string>;
  structNames: Set<string>;
}): CodeGenResult | null {
  if (isFuncPointerDecl(options.decl.underlyingType)) {
    return {
      isType: true,
      code: generateFuncPointerTypedef(options.decl),
    };
  }

  const underlying = options.decl.underlyingType;
  const baseName = normalizeTypeName(underlying.name);

  if (options.structNames.has(baseName)) {
    return null;
  }

  if (options.enumNames.has(baseName)) {
    return null;
  }

  const tsType = resolveTypedefType({
    typeNames: underlying.name,
    enumNames: options.enumNames,
  });

  return {
    isType: true,
    code: `export type ${options.decl.name} = ${tsType};`,
  };
}
