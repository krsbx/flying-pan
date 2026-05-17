import type { CEnumConstant, CEnumDecl, ClangNode } from '@/ffi-ast/types/ast';
import { CDeclarationKind, DeclarationKind } from '@/ffi-ast/utility';
import { extractNodeLocation } from '../utility';

function parseEnumValue(node: ClangNode): number {
  if (!node.inner || node.inner.length === 0) return 0;

  const valNode = node.inner[0]!;

  if (valNode.kind === CDeclarationKind.INTEGER_LITERAL) {
    return parseInt(valNode.value ?? '0', 10);
  }

  if (valNode.kind === CDeclarationKind.UNARY_OPERATOR) {
    const operand = valNode.inner?.[0];
    const num = parseInt(operand?.value ?? '0', 10);

    return -num;
  }

  if (valNode.kind === CDeclarationKind.DECL_REF_EXPR) {
    return 0;
  }

  return parseInt(valNode.value ?? '0', 10);
}

export function parseEnumDecl(node: ClangNode): CEnumDecl {
  const name = node.name || '';
  const isOpaque = !node.completeDefinition;
  const loc = extractNodeLocation(node);
  const constants: CEnumConstant[] = [];

  if (node.inner) {
    for (const child of node.inner) {
      if (child.kind === 'EnumConstantDecl' && child.name) {
        constants.push({
          name: child.name,
          value: parseEnumValue(child),
        });
      }
    }
  }

  return {
    kind: DeclarationKind.ENUM,
    name,
    constants,
    isOpaque,
    loc,
    doc: null,
  };
}
