import {
  DeclarationKind,
  type CASTNode,
  type CEnumDecl,
  type CFunctionDecl,
  type CFunctionPointerDecl,
  type CHeaderDecl,
  type CStructDecl,
  type CTypedefDecl,
} from '@/ffi-ast';
import { ClangNodeParser, type ParseOptions } from '@/ffi-ast/parser';
import {
  generateCallbackCode,
  generateEnumCode,
  generateFFIDefinition,
  generateFunctionCode,
  generateStructCode,
  generateTypedefCode,
} from './codegen';
import type { CodeGenpart } from './types/codegen';
import { CType } from './utility/constant';
import { normalizeTypeName } from './utility/helper';

export interface FFICodeGeneratorOptions {
  /** Name of the library, will be use to name the class */
  libName: string;

  /** Output directory */
  outputDir: string;
}

export class FFICodeGenerator {
  public options: FFICodeGeneratorOptions;

  public constructor(options: FFICodeGeneratorOptions) {
    this.options = options;
  }

  public async parseAndGenerate(
    options: ParseOptions & {
      source: string | unknown;
    }
  ): Promise<void> {
    const parser = new ClangNodeParser(options.source);
    const parsed = await parser.parse(options);
    await this.generate(parsed);
  }

  private collectNames<T extends { name: string }>(
    declarations: CASTNode[],
    kind: string | string[]
  ): Set<string> {
    const names = new Set<string>();
    const kinds = new Set(Array.isArray(kind) ? kind : [kind]);

    for (const decl of declarations) {
      if (kinds.has(decl.kind) && (decl as unknown as T).name) {
        names.add((decl as unknown as T).name);
      }
    }

    return names;
  }

  private async writeGeneratedFile(options: {
    outputDir: string;
    filename: string;
    content: string;
  }): Promise<void> {
    const filePath = `${options.outputDir}/${options.filename}`;

    await Bun.write(filePath, options.content);

    console.log(`Generated ${filePath}`);
  }

  public async generate(parsed: CHeaderDecl): Promise<void> {
    const enumNames = this.collectNames(
      parsed.declarations,
      DeclarationKind.ENUM
    );
    const structNames = this.collectNames(parsed.declarations, [
      DeclarationKind.STRUCT,
      DeclarationKind.UNION,
    ]);

    const { libName, outputDir } = this.options;
    const className = libName;

    const parts: CodeGenpart = {
      constant: [],
      enums: [],
      ffiSymbols: [],
      functions: [],
      structs: [],
      types: [],
    };

    for (const decl of parsed.declarations) {
      switch (decl.kind) {
        case DeclarationKind.STRUCT:
        case DeclarationKind.UNION: {
          const { isType, code } = generateStructCode({
            decl: decl as CStructDecl,
            structNames,
          });

          if (isType) {
            parts.types.push(code);
          } else {
            parts.structs.push(code);
          }

          break;
        }

        case DeclarationKind.ENUM: {
          const results = generateEnumCode(decl as CEnumDecl);

          for (const { isType, code } of results) {
            if (isType) {
              parts.types.push(code);
            } else {
              parts.enums.push(code);
            }
          }

          break;
        }

        case DeclarationKind.FUNCTION: {
          const funcDecl = decl as CFunctionDecl;

          const code = generateFunctionCode({
            decl: funcDecl,
            enumNames,
            libName,
          });

          const ffi = generateFFIDefinition(funcDecl);

          parts.ffiSymbols.push(ffi);
          parts.functions.push(code);
          break;
        }

        case DeclarationKind.FUNCTION_POINTER: {
          const { isType, code } = generateCallbackCode(
            decl as CFunctionPointerDecl
          );

          if (isType) {
            parts.types.push(code);
          }

          break;
        }

        case DeclarationKind.TYPEDEF: {
          const result = generateTypedefCode({
            decl: decl as CTypedefDecl,
            enumNames,
            structNames,
          });

          if (!result) break;

          const { isType, code } = result;

          if (isType) {
            parts.types.push(code);
          } else {
            parts.enums.push(code);
          }

          break;
        }
      }
    }

    const hasStringParams = parsed.declarations.some(
      (decl) =>
        decl.kind === DeclarationKind.FUNCTION &&
        (decl as CFunctionDecl).params.some(
          (p) =>
            p.type.pointerDepth === 1 &&
            p.type.isConst &&
            normalizeTypeName(p.type.name) === CType.CHAR
        )
    );

    const promises: Promise<void>[] = [];

    if (parts.types.length > 0) {
      promises.push(
        this.writeGeneratedFile({
          outputDir,
          filename: 'types.ts',
          content: [
            `import type { Pointer } from 'bun:ffi';`,
            '',
            parts.types.join('\n\n'),
          ].join('\n'),
        })
      );
    }

    if (parts.structs.length > 0) {
      promises.push(
        this.writeGeneratedFile({
          outputDir,
          filename: 'structs.ts',
          content: [
            `import type { Pointer } from 'bun:ffi';`,
            `import { BaseStruct } from '@utility/base-struct';`,
            '',
            parts.structs.join('\n\n'),
          ].join('\n'),
        })
      );
    }

    if (parts.enums.length > 0) {
      promises.push(
        this.writeGeneratedFile({
          outputDir,
          filename: 'enums.ts',
          content: parts.enums.join('\n\n'),
        })
      );
    }

    if (parts.functions.length > 0) {
      promises.push(
        this.writeGeneratedFile({
          outputDir,
          filename: 'functions.ts',
          content: [
            `import type { CString, Pointer } from 'bun:ffi';`,
            `import type { ${libName} } from './index';`,
            ...(hasStringParams
              ? [`import { stringToCString } from '@utility/common';`, '']
              : ['']),
            parts.functions.join('\n\n'),
          ].join('\n'),
        })
      );
    }

    if (parts.ffiSymbols.length > 0) {
      const entries = parts.ffiSymbols.map((def) => {
        const comment = `  // ${def.name}`;
        const args = `\n    args: [${def.args.map((a) => `FFIType.${a}`)}]`;
        const returns = `\n    returns: FFIType.${def.returns}`;

        return `${comment}\n  ${def.name}: {${args},${returns},\n  },`;
      });

      promises.push(
        this.writeGeneratedFile({
          outputDir,
          filename: 'constant.ts',
          content: [
            `import { FFIType, type FFIFunction } from 'bun:ffi';`,
            '',
            `export const ${libName}Definition = {`,
            ...entries,
            `} satisfies Record<string, FFIFunction>;`,
          ].join('\n'),
        })
      );
    }

    const classImport = [
      `import { dlopen, type ConvertFns, type Library } from 'bun:ffi';`,
    ];

    const classTypes = [
      `type FFISymbols = ${parts.ffiSymbols.length > 0 ? `typeof ${libName}DefinitionType;` : '{}'}`,
    ];

    if (parts.ffiSymbols.length > 0) {
      classImport.push(
        `import { ${libName}Definition, type ${libName}Definition as ${libName}DefinitionType } from './constant';`
      );
    }

    if (parts.functions.length > 0) {
      classImport.push(`import * as Translations from './functions';`);
      classTypes.push('type TranslationsType = typeof Translations;');
    }

    const indexContent = [
      classImport.join('\n'),
      '',
      classTypes.join('\n\n'),
      '',
      `class Base${className} implements Library<FFISymbols> {`,
      `  public readonly close: () => void;`,
      `  public readonly symbols: ConvertFns<FFISymbols>;`,
      '',
      `  public constructor(filePath: string) {`,
      `    const lib = dlopen(filePath, ${libName}Definition);`,
      '',
      `    this.symbols = lib.symbols;`,
      `    this.close = () => lib.close();`,
      '',
      `    Object.entries(Translations).forEach(([key, value]) => {`,
      `      (this as Record<string, unknown>)[key] = (`,
      `        value as (...args: unknown[]) => unknown`,
      `      ).bind(this);`,
      `    });`,
      `  }`,
      '',
      `  public [Symbol.dispose]() {`,
      `    this.close();`,
      `  }`,
      `}`,
      '',
      `export interface ${className} extends Base${className}, TranslationsType {}`,
      '',
      `export const ${className} = Base${className} as new (`,
      `  ...args: ConstructorParameters<typeof Base${className}>`,
      `) => ${className};`,
    ];

    promises.push(
      this.writeGeneratedFile({
        outputDir,
        filename: 'index.ts',
        content: indexContent.join('\n'),
      })
    );

    await Promise.all(promises);
  }
}
