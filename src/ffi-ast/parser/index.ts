/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from '../types/ast';
import { CDeclarationKind, DeclarationKind } from '../utility';
import { parseCTypeFromString } from './utility';

interface ParseOptions {
  /** Only include declarations whose names match this prefix (e.g. "GLFW") */
  namePrefix?: string;
  /** Only include declarations from this source file (substring match) */
  sourceFile?: string;
}

export class ClangNodeParser {
  public readonly path: string;

  public constructor(path: string) {
    this.path = path;
  }

  public async parse(options: ParseOptions = {}): Promise<CHeaderDecl> {
    const Parser = ClangNodeParser;
    const root: ClangNode = await Bun.file(this.path).json();
    const declarations: CASTNode[] = [];

    const inner = root.inner ?? [];

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
      declarations: [],
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

  private static parseFunctionDecl(node: ClangNode): CFunctionDecl {
    throw new Error('Not implemented!');
  }

  private static parseTypedefDecl(node: ClangNode): CTypedefDecl {
    throw new Error('Not implemented!');
  }

  private static parseRecordDecl(
    node: ClangNode
  ): CStructDecl | CUnionDecl | null {
    if (!node.name) return null;

    const isOpaque = !node.completeDefinition;
    const loc = { line: node.loc?.line ?? 0, column: node.loc?.col ?? 0 };

    const fields: CStructField[] = [];

    if (node.inner) {
      for (const child of node.inner) {
        if (child.kind === CDeclarationKind.FUNCTION_DECL && child.name) {
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
      doc: null,
    };
  }

  private static parseEnumDecl(node: ClangNode): CEnumDecl | null {
    throw new Error('Not implemented!');
  }

  private static parseVarDecl(node: ClangNode): CVarDecl | null {
    if (!node.name) return null;

    return {
      kind: DeclarationKind.VAR,
      name: node.name,
      type: parseCTypeFromString(node.type?.qualType ?? ''),
      loc: {
        line: node.loc?.line ?? 0,
        column: node.loc?.col ?? 0,
      },
      doc: null,
    };
  }
}
