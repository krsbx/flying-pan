# FFI Codegen

The first half of flying-pan. Parses Clang AST JSON dumps and generates type-safe TypeScript FFI bindings using Bun's `bun:ffi`.

**Pipeline**: `clang -ast-dump=json` → Parser → Codegen → TypeScript files

## AST types (`src/ffi/ast/`)

### `ClangNode` (`ffi/ast/types.ts`)
Raw shape of a node in clang's AST JSON. Key fields:
- `kind` — node kind string (mapped via `CDeclarationKind`)
- `name`, `loc`, `range` — identifier and source location
- `type.qualType` / `type.desugaredQualType` — C type strings
- `inner: ClangNode[]` — child nodes
- `storageClass`, `isImplicit`, `inline`, `completeDefinition`, `tagUsed`, `isBitField`, `bitWidth`, `text`, `value`

### Normalized `CASTNode` subtypes
| Type | Kind | Represents |
|---|---|---|
| `CFunctionDecl` | `FUNCTION` | Function: returnType, name, params[] |
| `CStructDecl` | `STRUCT` | Record: name, fields[], isOpaque |
| `CEnumDecl` | `ENUM` | Enum: name, constants[], isOpaque |
| `CTypedefDecl` | `TYPEDEF` | Typedef: name, underlyingType, tag |
| `CVarDecl` | `VAR` | Global variable: name, type |

`DeclarationKind` is the normalized internal enum; `CDeclarationKind` maps clang's kind strings to it (`ffi/ast/utility.ts`).

### Supporting types
- `CTypeDecl` — `{ name, isPointer, isConst, isArray, arraySize }`
- `CFunctionParam` — `{ name, type }`
- `CStructField` — `{ name, type, isBitField, bitWidth }`
- `CEnumConstant` — `{ name, value }`
- `CFunctionPointerDecl` — function pointer return/params

## Parser (`src/ffi/parser/`)

### `ClangNodeParser` (`ffi/parser/parser/index.ts`)
```ts
class ClangNodeParser {
  constructor(path: string)            // path to clang AST JSON
  async parse(options?): Promise<CHeaderDecl>
}
```

### `ParseOptions`
```ts
{
  namePrefix?: string;    // filter by name prefix, e.g. "GLFW"
  sourceFile?: string;     // filter by source file (substring)
}
```

### Top-level iteration
For each `node` in root `inner[]`:
- Skip `isImplicit`, no `loc.line`, `inline`, `storageClass === 'static'`
- If `sourceFile` set: filter by file, exclude system headers (`findIncludedFrom`)
- Dispatch to specialized parser via `parseNode(node)`

### Dispatch (`parseNode`)
```ts
switch (node.kind) {
  case CDeclarationKind.FUNCTION_DECL:  return parseFunctionDecl(node)
  case CDeclarationKind.TYPEDEF_DECL:   return parseTypedefDecl(node)
  case CDeclarationKind.RECORD_DECL:    return parseRecordDecl(node)
  case CDeclarationKind.ENUM_DECL:      return parseEnumDecl(node)
  case CDeclarationKind.VAR_DECL:       return parseVarDecl(node)
  default: return null
}
```

Specialized parsers live in `ffi/parser/parser/*.parser.ts`.

## Codegen (`src/ffi/codegen/index.ts`)

### `FFICodeGenerator`
```ts
class FFICodeGenerator {
  constructor(options: { libName, outputDir, macroFile?, macroPrefix? })
  async parseAndGenerate(options): Promise<void>
  async generate(parsed: CHeaderDecl): Promise<void>
}
```

### Emitted files
| File | Contents |
|---|---|
| `types.ts` | Type aliases (typedefs), function pointer signatures |
| `structs.ts` | Generated classes extending `BaseStruct` with typed getters/setters |
| `enums.ts` | Enum constant objects + unioned types |
| `functions.ts` | Typed wrapper methods (single object param, see [CONVENTIONS.md](./CONVENTIONS.md)) |
| `constant.ts` | `FFIFunction` definitions for `dlopen` (`args`/`returns` FFIType) |
| `index.ts` | Main library class extending `Library<FFISymbols>` |

### Generated index.ts shape
```ts
class BaseGLFW implements Library<FFISymbols> {
  close: () => void
  symbols: ConvertFns<FFISymbols>
  constructor(filePath: string) {
    const lib = dlopen(filePath, GLFWDefinition)
    this.symbols = lib.symbols
    this.close = () => lib.close()
    // bind all functions.ts methods
  }
}
export interface GLFW extends BaseGLFW, TranslationsType {}
export const GLFW = BaseGLFW as new (...args) => GLFW
```

### Generated functions.ts shape
All wrappers take a **single options object** (never positional args):
```ts
export function glfwCreateWindow(this: GLFW, options: {
  width: number; height: number; title: string | null
}): Pointer {
  return this.symbols.glfwCreateWindow(
    options.width, options.height, stringToCString(options.title).ptr
  ) as Pointer
}
```

## C → TS/FFI type mapping (`src/ffi/codegen/utility/`)

### `CType` (`utility/constant.ts`)
```ts
INT, UINT, SHORT, USHORT, CHAR, UCHAR, FLOAT, DOUBLE,
LONG_LONG, ULONG_LONG, LONG, ULONG, SIZE_T, VOID
```

### `CTypeToFFIType`
Maps C primitives → Bun FFIType strings: `i32, u32, i16, u16, i8, u8, f32, f64, i64, u64, void`. (`long` → `i32` on macOS.)

### `PrimitiveMap`
Per CType: `{ prefix: DataViewPrefix, size: number, tsType: TypeScriptType }`.

### `DataViewPrefix`
`i32→'Int32'`, `u32→'Uint32'`, ... `i64→'BigInt64'`, `u64→'BigUint64'`. Used to generate `view.getInt32(offset, true)` calls in struct classes.

### `TypeScriptType`
`NUMBER, BIGINT, STRING, BOOLEAN, VOID, NEVER, POINTER, TYPED_ARRAY, CSTRING, NULL`

### Conversion helpers (`utility/conversion.ts`)
- `cTypeToFFI(cType, aliases?)` → FFIType key
- `cTypeToTsType(cType, aliases?)` → TypeScriptType
- `cTypeToViewMethod(cType, aliases?)` → DataView method info

## Struct utilities (`src/utility/`)

### `BaseStruct` (`utility/base-struct.ts`)
Abstract base for generated struct classes.
```ts
abstract class BaseStruct {
  static readonly BYTE_SIZE: number
  $memory: Uint8Array
  $view: DataView
  get $address(): Pointer        // ptr(this.$memory)

  static allocMemory(): Uint8Array
  static create<T>(data?): T         // new + Object.assign
  static fromPointer<T>(ptr): T      // wrap existing FFI memory
  clone(data?): this                 // $memory.slice() + assign
  reset(): this                      // fill(0)
  equals(other): boolean             // byte-by-byte compare
}
```

Generated struct classes add typed field getters/setters:
```ts
class GLFWvidmode extends BaseStruct {
  static readonly BYTE_SIZE = 32
  get width() { return this.$view.getInt32(0, true) }
  set width(v: number) { this.$view.setInt32(0, v, true) }
  // ...
}
```

### `CStruct` (`utility/cstruct/`)
Lower-level helper used by codegen internals.
```ts
class CStruct {
  static readonly BYTE_SIZE = { u8:1, i8:1, u16:2, i16:2, u32:4, i32:4,
                                f32:4, u64:8, i64:8, f64:8, intptr:8, ptr:8 }
  $memory, $view, $address
  getValue(offset, type)       // switch on type → DataView getter (little-endian)
  setValue(offset, value, type)
  clone()
}
```

### `CWideString` (`utility/cwstring.ts`)
Wide-string interop — UTF-16 on Windows, UTF-32 on POSIX.
```ts
WIDE_STRING_CHAR_SIZE = IS_WINDOWS ? 2 : 4
```
- Scans up to 4096 bytes for null terminator to compute length
- Windows: `TextDecoder('utf-16le')`
- POSIX: manual `getUint32` loop → `String.fromCodePoint`

### `common.ts` helpers
- `stringToCString(str)` — null-terminated UTF-8
- `stringToCWideString(str)` — null-terminated wide string
- `combineBitwise(...flags)` — bitwise OR

## Build scripts (`bin/`)

Each script wires a parser + generator:

```ts
// bin/glfw.ts
const parser = new ClangNodeParser(path.join(import.meta.dir, '../assets/glfw3.json'))
const parsed = await parser.parse()

const generator = new FFICodeGenerator({
  libName: 'GLFW',
  outputDir: path.join(import.meta.dir, '../src/library/glfw'),
  macroFile: path.join(import.meta.dir, '../assets/glfw3.macros'),
  macroPrefix: 'GLFW_',
})
await generator.generate(parsed)
```

Scripts: `glfw.ts`, `miniaudio.ts`, (and equivalent for truetype/image).

### Regeneration
1. `clang -Xclang -ast-dump=json -F GLFW/glfw3.h > assets/glfw3.json`
2. `gcc -dM -E /usr/include/GLFW/glfw3.h > assets/glfw3.macros`
3. `bun run bin/glfw.ts`

## Generated bindings (`src/library/`)

Output of the codegen. **Do not hand-edit** — regenerate via build scripts. Each binding set has:
- `constant.ts` — FFI symbol definitions
- `enums.ts` — enum constants + types
- `functions.ts` — typed FFI wrappers
- `index.ts` — library class
- `structs.ts` — generated struct classes
- `types.ts` — type aliases

Usage:
```ts
import { GLFW } from '@glfw'
const glfw = new GLFW('/path/to/libglfw.dylib')
const win = glfw.glfwCreateWindow({ width: 800, height: 600, title: 'App' })
```

See [CONVENTIONS.md](./CONVENTIONS.md) for path aliases like `@glfw`, `@basestruct`, `@cstruct`.
