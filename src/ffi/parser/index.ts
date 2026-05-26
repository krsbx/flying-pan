import { basename } from 'node:path';
import type { CASTNode, CHeaderDecl, ClangNode } from '../ast/types';
import { CDeclarationKind, DeclarationKind } from '../ast/utility';
import {
  parseEnumDecl,
  parseFunctionDecl,
  parseRecordDecl,
  parseTypedefDecl,
  parseVarDecl,
} from './parser';

export interface ParseOptions {
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

      // Skip inline and static functions — not exported from shared libraries
      if (node.inline) continue;
      if (node.storageClass === 'static') continue;

      if (options.sourceFile) {
        const file = node.loc?.file ?? null;
        const includedFrom = node.loc?.includedFrom?.file ?? null;

        // includedFrom means the node is from an #include'd system header
        if (includedFrom) {
          continue;
        }

        // loc.file pointing to a non-matching path → system header
        if (file && !file.includes(options.sourceFile)) {
          continue;
        }
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
