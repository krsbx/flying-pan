import type { CFunctionPointerDecl } from '../../ast';
import type { CodeGenResult } from '../types';
import {
  type PrimitiveAliasMap,
  TypeScriptType,
  cTypeToTsType,
  normalizeTypeName,
} from '../utility';
import { CType } from '../utility/constant';

export function generateCallbackCode(
  decl: CFunctionPointerDecl,
  aliases?: PrimitiveAliasMap
): CodeGenResult {
  const params = decl.params
    .map((p, i) => {
      const name = p.name || `arg${i}`;
      const tsType = cTypeToTsType(p.type, aliases);

      return `${name}: ${tsType}`;
    })
    .join(', ');

  const baseName = normalizeTypeName(decl.returnType.name);
  const isVoid = baseName === CType.VOID && decl.returnType.pointerDepth === 0;

  const returnType = isVoid
    ? [TypeScriptType.POINTER, TypeScriptType.NULL].join(' | ')
    : cTypeToTsType(decl.returnType, aliases);

  return {
    isType: true,
    code: `export type ${decl.name} = (${params}) => ${returnType};`,
  };
}
