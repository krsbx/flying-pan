import type { CStructDecl, CTypeDecl, CUnionDecl } from '@/ffi-ast';

export type DataViewDataType<T extends keyof DataView = keyof DataView> =
  T extends string
    ? T extends `set${infer U}`
      ? U
      : T extends `get${infer V}`
        ? V
        : never
    : never;

export interface DataViewMethodInfo {
  getter: `get${DataViewDataType}`;
  setter: `set${DataViewDataType}`;
  size: number;
}

export interface FFISymbolDef {
  name: string;
  returns: string;
  args: string[];
}

export type CStructLikeDecl = CStructDecl | CUnionDecl;

export interface CodeGenResult {
  isType: boolean;
  code: string;
}

export interface FieldLayout {
  type: CTypeDecl & { name: string };
  name: string;
  offset: number;
  bitWidth: number | null;
}

export interface LayoutResult {
  fields: FieldLayout[];
  byteSize: number;
}

export interface CodeGenpart {
  constant: string[];
  enums: string[];
  functions: string[];
  ffiSymbols: FFISymbolDef[];
  structs: string[];
  types: string[];
}
