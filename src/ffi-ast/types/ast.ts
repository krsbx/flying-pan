import type { DeclarationKind } from '../utility';

export interface CASTNode {
  kind: string;
  loc: {
    line: number;
    column: number;
  };
  doc: string | null;
}

export interface CType {
  name: string;
  isConst: boolean;
  pointerDepth: number;
  arraySize: number | null;
}

export interface CFunctionParam {
  type: CType;
  name: string;
}

export interface CFunctionDecl extends CASTNode {
  kind: typeof DeclarationKind.FUNCTION;
  returnType: CType;
  name: string;
  params: CFunctionParam[];
}

export interface CStructField {
  type: CType;
  name: string;
  bitWidth: number | null;
}

export interface CStructDecl extends CASTNode {
  kind: typeof DeclarationKind.STRUCT;
  name: string;
  fields: CStructField[];
  isOpaque: boolean;
}

export interface CUnionDecl extends CASTNode {
  kind: typeof DeclarationKind.UNION;
  name: string;
  fields: CStructField[];
  isOpaque: boolean;
}

export interface CFunctionPointerDecl extends CASTNode {
  kind: typeof DeclarationKind.FUNCTION_POINTER;
  name: string;
  returnType: CType;
  params: CFunctionParam[];
}

export interface CTypedefDecl extends CASTNode {
  kind: typeof DeclarationKind.TYPEDEF;
  name: string;
  underlyingType: CType | CFunctionPointerDecl;
}

export interface CEnumConstant {
  name: string;
  value: number;
}

export interface CEnumDecl extends CASTNode {
  kind: typeof DeclarationKind.ENUM;
  name: string;
  constants: CEnumConstant[];
  isOpaque: boolean;
}

export interface CVarDecl extends CASTNode {
  kind: typeof DeclarationKind.VAR;
  name: string;
  type: CType;
}

export interface CHeaderDecl {
  kind: typeof DeclarationKind.HEADER;
  name: string;
  declarations: CASTNode[];
}
