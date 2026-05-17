import type {
  CStructField,
  CASTNode,
  CEnumDecl,
  CFunctionDecl,
  CHeaderDecl,
  ClangNode,
  CStructDecl,
  CTypedefDecl,
  CUnionDecl,
  CVarDecl,
  CEnumConstant,
  CFunctionPointerDecl,
} from '../types/ast';
import { CDeclarationKind, DeclarationKind } from '../utility';
import {
  extractDoc,
  extractNodeLocation,
  isFunctionPointerType,
  parseCTypeFromString,
  parseFunctionPointerParams,
  parseParams,
  parseReturnTypeFromQualType,
} from './utility';

interface ParseOptions {
  /** Only include declarations whose names match this prefix (e.g. "GLFW") */
  namePrefix?: string;
  /** Only include declarations from this source file (substring match) */
  sourceFile?: string;
}

export class ClangNodeParser {
  public readonly path: string | null;
  public readonly json: unknown | null;

  public constructor(path: string);
  public constructor(json: unknown);
  public constructor(args: string | unknown) {
    this.path = typeof args === 'string' ? args : null;
    this.json = typeof args === 'object' ? args : null;
  }

  public async parse(options: ParseOptions = {}): Promise<CHeaderDecl> {
    const Parser = ClangNodeParser;
    const root: ClangNode | null = this.path
      ? await Bun.file(this.path).json()
      : this.json;
    const declarations: CASTNode[] = [];

    const inner = root?.inner ?? [];

    for (const node of inner) {
      if (node.isImplicit) continue;
      if (!node.loc?.line) continue;

      if (
        options.sourceFile &&
        node.loc.file &&
        !node.loc.file.includes(options.sourceFile)
      ) {
        continue;
      }

      const decl = Parser.parseNode(node, options);

      if (decl) declarations.push(decl);
    }

    return {
      filename: '',
      kind: DeclarationKind.HEADER,
      declarations,
    };
  }

  private static parseNode(node: ClangNode, options: ParseOptions) {
    if (
      options.namePrefix &&
      node.name &&
      !node.name.startsWith(options.namePrefix)
    ) {
      return null;
    }

    switch (node.kind) {
      case CDeclarationKind.FUNCTION_DECL:
        return this.parseFunctionDecl(node);

      case CDeclarationKind.TYPEDEF_DECL:
        return this.parseTypedefDecl(node);

      case CDeclarationKind.RECORD_DECL:
        return this.parseRecordDecl(node);

      case CDeclarationKind.ENUM_DECL:
        return this.parseEnumDecl(node);

      case CDeclarationKind.VAR_DECL:
        return this.parseVarDecl(node);

      default:
        return null;
    }
  }

  private static parseFunctionDecl(node: ClangNode): CFunctionDecl | null {
    if (!node.name) return null;

    const qualType = node.type?.qualType ?? '';
    const returnType = parseReturnTypeFromQualType(qualType);
    const params = parseParams(node.inner ?? []);
    const loc = extractNodeLocation(node);
    const doc = extractDoc(node.inner);

    return {
      kind: DeclarationKind.FUNCTION,
      name: node.name,
      returnType,
      params,
      loc,
      doc,
    };
  }

  private static parseFunctionPointerTypedef(
    node: ClangNode,
    qualType: string
  ): CFunctionPointerDecl | null {
    if (!node.name) return null;

    const ptrMatch = qualType.match(/^(.+?)\s*\(\*/);

    if (!ptrMatch) return null;

    const returnType = parseCTypeFromString(ptrMatch[1]!.trim());
    const params = parseFunctionPointerParams(qualType);
    const loc = extractNodeLocation(node);

    return {
      kind: DeclarationKind.FUNCTION_POINTER,
      name: node.name,
      returnType,
      params,
      loc,
      doc: null,
    };
  }

  private static parseTypedefDecl(
    node: ClangNode
  ): CTypedefDecl | CFunctionPointerDecl | null {
    if (!node.name) return null;

    const qualType = node.type?.qualType ?? '';
    const loc = extractNodeLocation(node);

    if (isFunctionPointerType(qualType)) {
      return this.parseFunctionPointerTypedef(node, qualType);
    }

    return {
      kind: DeclarationKind.TYPEDEF,
      name: node.name,
      underlyingType: parseCTypeFromString(qualType),
      loc,
      doc: null,
    };
  }

  private static parseRecordDecl(
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

  private static parseEnumDecl(node: ClangNode): CEnumDecl {
    const name = node.name || '';
    const isOpaque = !node.completeDefinition;
    const loc = extractNodeLocation(node);
    const constants: CEnumConstant[] = [];

    if (node.inner) {
      for (const child of node.inner) {
        if (child.kind === 'EnumConstantDecl' && child.name) {
          constants.push({
            name: child.name,
            value: this.parseEnumValue(child),
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

  private static parseEnumValue(node: ClangNode): number {
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

  private static parseVarDecl(node: ClangNode): CVarDecl | null {
    if (!node.name) return null;

    const loc = extractNodeLocation(node);

    return {
      kind: DeclarationKind.VAR,
      name: node.name,
      type: parseCTypeFromString(node.type?.qualType ?? ''),
      loc,
      doc: null,
    };
  }
}
