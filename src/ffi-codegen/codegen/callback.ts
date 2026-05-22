import type { CFunctionPointerDecl } from '@/ffi-ast';

export function generateCallbackCode(decl: CFunctionPointerDecl): string {
  const params = decl.params
    .map((p, i) => {
      const name = p.name || `arg${i}`;
      const tsType = p.type.name;

      return `${name}: ${tsType}`;
    })
    .join(', ');

  const returnType = decl.returnType.name;

  return `export type ${decl.name} = (${params}) => ${returnType};`;
}
