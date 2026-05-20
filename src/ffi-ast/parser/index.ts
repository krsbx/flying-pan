import { basename } from 'node:path';
import type { CASTNode, CHeaderDecl, ClangNode } from '../types/ast';
import { CDeclarationKind, DeclarationKind } from '../utility';
import {
  parseEnumDecl,
  parseFunctionDecl,
  parseRecordDecl,
  parseTypedefDecl,
  parseVarDecl,
} from './parser';

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
      filename: this.path ? basename(this.path) : '',
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
        return parseFunctionDecl(node);

      case CDeclarationKind.TYPEDEF_DECL:
        return parseTypedefDecl(node);

      case CDeclarationKind.RECORD_DECL:
        return parseRecordDecl(node);

      case CDeclarationKind.ENUM_DECL:
        return parseEnumDecl(node);

      case CDeclarationKind.VAR_DECL:
        return parseVarDecl(node);

      default:
        return null;
    }
  }
}
