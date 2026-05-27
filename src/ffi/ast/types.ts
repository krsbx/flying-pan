import type {
  CDeclarationKind,
  CDeclarationTag,
  DeclarationKind,
} from './utility';

/** A single position in a Clang AST — can recursively contain spelling/expansion locations */
export interface ClangLoc {
  offset: number | null;
  line: number | null;
  col: number | null;
  tokLen: number | null;
  file: string | null;
  includedFrom: {
    file: string;
  } | null;
  spellingLoc: ClangLoc | null;
  expansionLoc: ClangLoc | null;
}

export interface ClangNode {
  kind: (string & {}) | CDeclarationKind;
  name: string | null;
  loc: ClangLoc | null;
  range: {
    begin: ClangLoc | null;
    end: ClangLoc | null;
  } | null;
  type: {
    desugaredQualType: string | null;
    qualType: string;
  } | null;
  isImplicit: boolean | null;
  inline: boolean | null;
  storageClass: string | null;
  completeDefinition: boolean | null;
  tagUsed: string | null;
  isBitField: boolean | null;
  bitWidth: number | null;
  inner: ClangNode[] | null;
  text: string | null;
  value: string | null;
}

export interface CASTNode {
  kind: string;
  loc: {
    line: number;
    column: number;
  };
  doc: string | null;
}

export interface CTypeDecl {
  name: string;
  isConst: boolean;
  pointerDepth: number;
  arraySize: number | null;
}

export interface CFunctionParam {
  type: CTypeDecl;
  name: string;
}

export interface CFunctionDecl extends CASTNode {
  kind: typeof DeclarationKind.FUNCTION;
  returnType: CTypeDecl;
  name: string;
  params: CFunctionParam[];
}

export interface CStructField {
  type: CTypeDecl;
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
  returnType: CTypeDecl;
  params: CFunctionParam[];
}

export interface CTypedefDecl extends CASTNode {
  kind: typeof DeclarationKind.TYPEDEF;
  name: string;
  underlyingType: CTypeDecl | CFunctionPointerDecl;
  /** The C tag (enum/struct/union) from the raw qualType, if any */
  tag: CDeclarationTag | null;
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
  type: CTypeDecl;
}

export interface CHeaderDecl {
  kind: typeof DeclarationKind.HEADER;
  filename: string;
  declarations: CASTNode[];
}
