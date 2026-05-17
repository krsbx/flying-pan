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
