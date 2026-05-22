import type {
  CStructLikeDecl,
  StructCodeResult,
} from '@/ffi-codegen/types/codegen';
import {
  computeLayout,
  generateBitField,
  generateRegularField,
  resolveStructName,
} from './helper';

export function generateStructCode(options: {
  decl: CStructLikeDecl;
  structNames: Set<string>;
}): StructCodeResult {
  if (options.decl.isOpaque || options.decl.fields.length === 0) {
    return {
      isType: true,
      code: `export type ${options.decl.name} = Pointer;`,
    } as const;
  }

  const { byteSize, fields } = computeLayout(options.decl);

  const lines = [
    `export class ${options.decl.name} extends BaseStruct {`,
    `  public static override readonly BYTE_SIZE = ${byteSize};`,
    '',
  ];

  for (const field of fields) {
    const nestedStruct = resolveStructName({
      cType: field.type,
      structNames: options.structNames,
    });

    if (nestedStruct) {
      // Nested struct field
      lines.push(
        `  public get ${field.name}(): ${nestedStruct} {`,
        `    return ${nestedStruct}.fromPointer(this.$address + ${field.offset});`,
        `  }`,
        ''
      );
    } else if (field.bitWidth !== null) {
      // Bit field
      lines.push(...generateBitField(field));
    } else {
      // Regular field
      lines.push(...generateRegularField(field));
    }
  }

  lines.push('}');

  return {
    isType: false,
    code: lines.join('\n'),
  };
}
