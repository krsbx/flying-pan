# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**flying-pan** is a C FFI binding generator for Bun. It parses Clang AST JSON dumps (produced by `clang -ast-dump=json`) and generates TypeScript FFI bindings using Bun's `bun:ffi` API. The project currently ships generated bindings for **GLFW** and **miniaudio**.

## Commands

```bash
bun install                  # Install dependencies
bun run build:glfw           # Regenerate GLFW bindings from assets/glfw3.json
bun run build:miniaudio      # Regenerate miniaudio bindings from assets/miniaudio.json
bun test                     # Run tests
bun run src/index.ts         # Run entry point
```

Linting/formatting runs via husky + lint-staged on commit (ESLint + Prettier).

## Architecture

The pipeline is: **Clang AST JSON → Parse → Codegen → TypeScript files**

### Core pipeline (`src/ffi/`)

1. **AST types** (`ffi/ast/`) — Defines `ClangNode` (raw clang JSON shape) and normalized `CASTNode` subtypes (`CFunctionDecl`, `CStructDecl`, `CEnumDecl`, etc.). `CDeclarationKind` maps clang node kind strings; `DeclarationKind` is the normalized internal enum.

2. **Parser** (`ffi/parser/`) — `ClangNodeParser` reads a clang AST JSON file, iterates top-level `inner` nodes, and dispatches to specialized parsers (`parseFunctionDecl`, `parseEnumDecl`, `parseRecordDecl`, `parseTypedefDecl`, `parseVarDecl`). Supports filtering by `namePrefix` and `sourceFile` to exclude system headers and unrelated symbols.

3. **Codegen** (`ffi/codegen/`) — `FFICodeGenerator` takes a `CHeaderDecl` and emits files:
   - `types.ts` — Type aliases (typedefs, function pointer types, opaque structs)
   - `structs.ts` — Classes extending `BaseStruct` with typed field getters/setters
   - `enums.ts` — Enum constant objects
   - `functions.ts` — Wrapped FFI function methods with type-safe signatures
   - `constant.ts` — FFI symbol definitions (`FFIFunction` objects for `dlopen`)
   - `index.ts` — Main library class that ties symbols + translations together

   C type → TypeScript/FFI type mapping lives in `ffi/codegen/utility/` (constant maps like `CTypeToFFIType`, `PrimitiveMap`, `DataViewPrefix`).

### Generated bindings (`src/glfw/`, `src/miniaudio/`)

Output of the codegen pipeline. Each directory contains `index.ts` (library class), `constant.ts` (FFI definitions), `functions.ts`, `structs.ts`, `types.ts`, and optionally `enums.ts`. **Do not hand-edit these** — regenerate with the build scripts.

### Utilities (`src/utility/`)

- **`BaseStruct`** (`base-struct.ts`) — Abstract base class for generated structs. Wraps a `Uint8Array` + `DataView` over FFI memory. Provides `create()`, `fromPointer()`, `clone()`, `equals()`.
- **`CStruct`** (`cstruct/`) — Lower-level struct helper with `getValue(offset, type)` / `setValue(offset, value, type)` using DataView methods. Used by codegen for field read/write.
- **`CWideString`** (`cwstring.ts`) — Wide string (UTF-16 on Windows, UTF-32 elsewhere) reader for FFI interop.
- **`common.ts`** — Helpers: `stringToCString`, `stringToCWideString`, `combineBitwise`.

### Build scripts (`bin/`)

Each script (`glfw.ts`, `miniaudio.ts`) creates a `ClangNodeParser` from an `assets/*.json` file and feeds it to `FFICodeGenerator` with a library name and output directory.

### Native libraries (`ffi/`)

Pre-built `.dylib` / `.a` files for macOS. Gitignored at root but `src/ffi/` is not.

## Path aliases (tsconfig.json)

```
@/*         → ./src/*
@cstruct    → ./src/utility/cstruct/index.ts
@cwstring   → ./src/utility/cwstring.ts
@basestruct → ./src/utility/base-struct.ts
@constant   → ./src/utility/constant.ts
@utility/*  → ./src/utility/*
```

## Bun conventions

Default to using Bun instead of Node.js:
- `bun <file>` instead of `node` or `ts-node`
- `bun test` instead of `jest` or `vitest`
- `bun install` instead of `npm install`
- `bun run <script>` instead of `npm run <script>`
- `bunx` instead of `npx`
- Bun auto-loads `.env` files (no dotenv)
- `bun:ffi` for FFI — `dlopen`, `FFIType`, `CString`, `ptr`, `toArrayBuffer`
