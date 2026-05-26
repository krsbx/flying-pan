import type { CFunctionPointerDecl } from '@/ffi-ast';
import { cTypeToTsType } from '@/ffi-codegen/utility/conversion';
import type { CodeGenResult } from '../types';

export function generateCallbackCode(
  decl: CFunctionPointerDecl
): CodeGenResult {
  const params = decl.params
    .map((p, i) => {
      const name = p.name || `arg${i}`;
      const tsType = cTypeToTsType(p.type);

      return `${name}: ${tsType}`;
    })
    .join(', ');

  const returnType = cTypeToTsType(decl.returnType);

  return {
    isType: true,
    code: `export type ${decl.name} = (${params}) => ${returnType};`,
  };
}
