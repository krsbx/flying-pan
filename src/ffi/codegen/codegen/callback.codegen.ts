import type { CFunctionPointerDecl } from '../../ast';
import type { CodeGenResult } from '../types';
import { cTypeToTsType } from '../utility';

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
