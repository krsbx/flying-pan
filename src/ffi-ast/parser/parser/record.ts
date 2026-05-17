import type {
  ClangNode,
  CStructDecl,
  CStructField,
  CUnionDecl,
} from '@/ffi-ast/types/ast';
import { CDeclarationKind, DeclarationKind } from '@/ffi-ast/utility';
import {
  extractDoc,
  extractNodeLocation,
  parseCTypeFromString,
} from '../utility';

export function parseRecordDecl(
  node: ClangNode
): CStructDecl | CUnionDecl | null {
  if (!node.name) return null;

  const isOpaque = !node.completeDefinition;
  const loc = extractNodeLocation(node);
  const doc = extractDoc(node.inner);

  const fields: CStructField[] = [];

  if (node.inner) {
    for (const child of node.inner) {
      if (child.kind === CDeclarationKind.FIELD_DECL && child.name) {
        const type = parseCTypeFromString(child.type?.qualType ?? '');

        const field: CStructField = {
          type,
          name: child.name,
          bitWidth: null,
        };

        if (child.isBitField) {
          field.bitWidth = child.bitWidth ?? 0;
        }

        fields.push(field);
      }
    }
  }

  const kind =
    node.tagUsed === 'union' ? DeclarationKind.UNION : DeclarationKind.STRUCT;

  return {
    kind,
    name: node.name,
    fields,
    isOpaque,
    loc,
    doc,
  };
}
