import { type CStructField, type CTypeDecl } from '../../../ast/types';
import { DeclarationKind } from '../../../ast/utility';
import {
  cTypeSize,
  cTypeToTsType,
  cTypeToViewMethod,
  normalizeTypeName,
} from '../..//utility';
import type { CStructLikeDecl, FieldLayout, LayoutResult } from '../../types';

export function resolveStructName(options: {
  cType: CTypeDecl;
  structNames: Set<string>;
}): string | null {
  if (options.cType.pointerDepth > 0 || options.cType.arraySize !== null)
    return null;

  const baseName = normalizeTypeName(options.cType.name);

  return options.structNames.has(baseName) ? baseName : null;
}

function alignTo(offset: number, alignment: number): number {
  return Math.ceil(offset / alignment) * alignment;
}

function computeStructLayout(fields: CStructField[]): LayoutResult {
  const layout: FieldLayout[] = [];
  let offset = 0;

  for (const field of fields) {
    const fieldSize = cTypeSize(field.type);
    const alignment = fieldSize <= 8 ? fieldSize : 8;

    offset = alignTo(offset, alignment);

    layout.push({
      type: field.type,
      name: field.name,
      offset,
      bitWidth: field.bitWidth,
    });

    offset += field.bitWidth !== null ? 4 : fieldSize;
  }

  const maxAlign = layout.reduce(
    (max, f) => Math.max(max, cTypeSize(f.type) <= 8 ? cTypeSize(f.type) : 8),
    1
  );

  return {
    fields: layout,
    byteSize: alignTo(offset, maxAlign),
  };
}

function computeUnionLayout(fields: CStructField[]): LayoutResult {
  const layout: FieldLayout[] = [];
  let maxSize = 0;

  for (const field of fields) {
    const fieldSize = cTypeSize(field.type);
    maxSize = Math.max(maxSize, fieldSize);

    layout.push({
      type: field.type,
      name: field.name,
      offset: 0,
      bitWidth: field.bitWidth,
    });
  }

  return {
    fields: layout,
    byteSize: maxSize,
  };
}

export function computeLayout(decl: CStructLikeDecl): LayoutResult {
  if (decl.kind === DeclarationKind.UNION) {
    return computeUnionLayout(decl.fields);
  }

  return computeStructLayout(decl.fields);
}

export function generateRegularField(field: FieldLayout): string[] {
  const viewInfo = cTypeToViewMethod(field.type);
  const tsType = cTypeToTsType(field.type);

  if (!viewInfo) {
    // Array or unsupported — return pointer
    return [
      `  public get ${field.name}(): ${tsType} {`,
      `    return (this.$address + ${field.offset}) as unknown as ${tsType};`,
      `  }`,
      '',
    ];
  }

  const lines: string[] = [];

  const needsNumberCast =
    viewInfo.getter === 'getBigInt64' && tsType !== 'bigint';
  const needsBigIntCast =
    viewInfo.setter === 'setBigInt64' && tsType !== 'bigint';

  const getExpr = needsNumberCast
    ? `Number(this.$view.${viewInfo.getter}(${field.offset}, true)) as ${tsType}`
    : `this.$view.${viewInfo.getter}(${field.offset}, true)`;

  lines.push(
    `  // ─── ${field.name} (offset ${field.offset}, ${field.type.name}) ───`
  );
  lines.push(
    `  public get ${field.name}(): ${tsType} {`,
    `    return ${getExpr};`,
    `  }`
  );

  // Skip setter for const pointer fields
  if (field.type.isConst && field.type.pointerDepth > 0) {
    lines.push('');
    return lines;
  }

  const setExpr = needsBigIntCast ? `BigInt(value)` : 'value';

  lines.push(
    `  public set ${field.name}(value: ${tsType}) {`,
    `    this.$view.${viewInfo.setter}(${field.offset}, ${setExpr}, true);`,
    `  }`,
    ''
  );

  return lines;
}

export function generateBitField(field: FieldLayout): string[] {
  const mask = (1 << field.bitWidth!) - 1;

  return [
    `  // ─── ${field.name} (offset ${field.offset}, bit field width ${field.bitWidth}) ───`,
    `  public get ${field.name}(): number {`,
    `    return this.$view.getUint32(${field.offset}, true) & 0x${mask.toString(16)};`,
    `  }`,
    `  public set ${field.name}(value: number) {`,
    `    const current = this.$view.getUint32(${field.offset}, true);`,
    `    this.$view.setUint32(${field.offset}, (current & ~0x${mask.toString(16)}) | (value & 0x${mask.toString(16)}), true);`,
    `  }`,
    '',
  ];
}
