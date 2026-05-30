import type { CFunctionPointerDecl } from '../../ast';
import type { CodeGenResult } from '../types';
import { TypeScriptType, cTypeToTsType, normalizeTypeName } from '../utility';
import { CType } from '../utility/constant';

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

  // Callbacks always use Pointer | null for FFI compatibility —
  // even void-returning C callbacks need a pointer return type for JSCallback
  const baseName = normalizeTypeName(decl.returnType.name);
  const isVoid = baseName === CType.VOID && decl.returnType.pointerDepth === 0;

  const returnType = isVoid
    ? [TypeScriptType.POINTER, TypeScriptType.NULL].join(' | ')
    : cTypeToTsType(decl.returnType);

  return {
    isType: true,
    code: `export type ${decl.name} = (${params}) => ${returnType};`,
  };
}
