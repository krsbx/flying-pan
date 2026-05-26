import type { CFunctionPointerDecl } from '@/ffi-ast';
import type { CodeGenResult } from '../types/codegen';

export function generateCallbackCode(
  decl: CFunctionPointerDecl
): CodeGenResult {
  const params = decl.params
    .map((p, i) => {
      const name = p.name || `arg${i}`;
      const tsType = p.type.name;

      return `${name}: ${tsType}`;
    })
    .join(', ');

  const returnType = decl.returnType.name;

  return {
    isType: true,
    code: `export type ${decl.name} = (${params}) => ${returnType};`,
  };
}
