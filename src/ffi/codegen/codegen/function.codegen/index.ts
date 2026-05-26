import type { CFunctionDecl } from '../../../ast/types';
import type { FFISymbolDef } from '../../types';
import { CType, TypeScriptType } from '../../utility/constant';
import { cTypeToFFI } from '../../utility/conversion';
import { resolveParamType, resolveReturnType } from './helper';

export function generateFFIDefinition(decl: CFunctionDecl): FFISymbolDef {
  return {
    name: decl.name,
    returns: cTypeToFFI(decl.returnType),
    args: decl.params.map((p) => cTypeToFFI(p.type)),
  };
}

export function generateFunctionCode(options: {
  decl: CFunctionDecl;
  libName: string;
  enumNames: Set<string>;
}): string {
  const returnType = resolveReturnType({
    cType: options.decl.returnType,
    enumNames: options.enumNames,
  });

  if (options.decl.params.length === 0) {
    const body =
      returnType === TypeScriptType.VOID
        ? `  this.symbols.${options.decl.name}();`
        : `  return this.symbols.${options.decl.name}() as ${returnType};`;

    return [
      `export function ${options.decl.name}(this: ${options.libName}): ${returnType} {`,
      body,
      `}`,
    ].join('\n');
  }

  const paramEntries = options.decl.params.map((p) => {
    const paramType = resolveParamType({
      cType: p.type,
      enumNames: options.enumNames,
    });

    return `    ${p.name}: ${paramType};`;
  });

  const argList = options.decl.params
    .map((p) => {
      const baseName = p.type.name.replace(/^(struct|enum|union)\s+/, '');

      if (
        p.type.pointerDepth === 1 &&
        p.type.isConst &&
        baseName === CType.CHAR
      ) {
        return `stringToCString(options.${p.name}).ptr`;
      }

      return `options.${p.name}`;
    })
    .join(', ');

  const body =
    returnType === TypeScriptType.VOID
      ? `  this.symbols.${options.decl.name}(${argList});`
      : `  return this.symbols.${options.decl.name}(${argList}) as ${returnType};`;

  return [
    `export function ${options.decl.name}(this: ${options.libName}, options: {`,
    ...paramEntries,
    `  }): ${returnType} {`,
    body,
    `}`,
  ].join('\n');
}
