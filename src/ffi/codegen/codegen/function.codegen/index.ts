import type { CFunctionDecl } from '../../../ast';
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

export interface FunctionCodeGenResult {
  code: string;
  /** Type names that must be imported from ./types */
  neededTypes: string[];
  needsStringHelper: boolean;
}

export function generateFunctionCode(options: {
  decl: CFunctionDecl;
  libName: string;
  enumNames: Set<string>;
}): FunctionCodeGenResult {
  const returnType = resolveReturnType({
    cType: options.decl.returnType,
    enumNames: options.enumNames,
  });

  if (options.decl.params.length === 0) {
    const body =
      returnType === TypeScriptType.VOID
        ? `  this.symbols.${options.decl.name}();`
        : `  return this.symbols.${options.decl.name}() as ${returnType};`;

    return {
      code: [
        `export function ${options.decl.name}(this: ${options.libName}): ${returnType} {`,
        body,
        `}`,
      ].join('\n'),
      neededTypes: [],
      needsStringHelper: false,
    };
  }

  const resolvedParams = options.decl.params.map((p) => ({
    ...resolveParamType({ cType: p.type, enumNames: options.enumNames }),
    name: p.name,
  }));

  const paramEntries = resolvedParams.map(
    (p) =>
      `    ${p.name}: ${p.typeName ? `TypedJSCallback<${p.code}>` : p.code};`
  );

  let needsStringHelper = false;

  const argList = options.decl.params
    .map((p, i) => {
      const baseName = p.type.name.replace(/^(struct|enum|union)\s+/, '');

      if (
        p.type.pointerDepth === 1 &&
        p.type.isConst &&
        baseName === CType.CHAR
      ) {
        needsStringHelper = true;
        return `stringToCString(options.${p.name}).ptr`;
      }

      return `options.${resolvedParams[i]!.name}`;
    })
    .join(', ');

  const body =
    returnType === TypeScriptType.VOID
      ? `  this.symbols.${options.decl.name}(${argList});`
      : `  return this.symbols.${options.decl.name}(${argList}) as ${returnType};`;

  return {
    code: [
      `export function ${options.decl.name}(this: ${options.libName}, options: {`,
      ...paramEntries,
      `  }): ${returnType} {`,
      body,
      `}`,
    ].join('\n'),
    neededTypes: resolvedParams
      .map((p) => p.typeName)
      .filter((t): t is string => t !== null),
    needsStringHelper,
  };
}
