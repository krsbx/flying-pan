export const CDeclarationKind = {
  FUNCTION_DECL: 'FunctionDecl',
  TYPEDEF_DECL: 'TypedefDecl',
  RECORD_DECL: 'RecordDecl',
  ENUM_DECL: 'EnumDecl',
  VAR_DECL: 'VarDecl',
  FULL_COMMENT: 'FullComment',
  TEXT_COMMENT: 'TextComment',
  PARAGRAPH_COMMENT: 'ParagraphComment',
  INTEGER_LITERAL: 'IntegerLiteral',
  UNARY_OPERATOR: 'UnaryOperator',
  DECL_REF_EXPR: 'DeclRefExpr',
  ENUM_CONSTANT_DECL: 'EnumConstantDecl',
  FIELD_DECL: 'FieldDecl',
  PARM_VAL_DECL: 'ParmVarDecl',
} as const;

export type CDeclarationKind =
  (typeof CDeclarationKind)[keyof typeof CDeclarationKind];

export const DeclarationKind = {
  FUNCTION: 'FUNCTION',
  STRUCT: 'STRUCT',
  UNION: 'UNION',
  FUNCTION_POINTER: 'FUNCTION_POINTER',
  TYPEDEF: 'TYPEDEF',
  ENUM: 'ENUM',
  VAR: 'VAR',
  HEADER: 'HEADER',
} as const;

export type DeclarationKind =
  (typeof DeclarationKind)[keyof typeof DeclarationKind];
