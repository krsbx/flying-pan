# flying-pan

A declarative GUI toolkit for Bun, built on GLFW + MiniAudio + OpenGL.

## Building native libraries

### stb_truetype (font rasterizer)

```bash
# macOS
gcc -dynamiclib -O3 stb_truetype.c -o libtruetype.dylib -lm

# Linux
gcc -shared -fPIC -O3 stb_truetype.c -o libtruetype.so -lm

# Windows (MinGW)
gcc -shared -O3 stb_truetype.c -o truetype.dll -lm
```

### miniaudio (audio)

```bash
# macOS
gcc -dynamiclib -O3 miniaudio.c -o libminiaudio.dylib -lm -framework CoreAudio -framework AudioToolbox -framework CoreFoundation

# Linux
gcc -shared -fPIC -O3 miniaudio.c -o libminiaudio.so -lm -lpthread -ldl

# Windows (MinGW)
gcc -shared -O3 miniaudio.c -o miniaudio.dll -lm -lksuser -lwinmm
```

## Generating AST dumps

The FFI bindings are generated from Clang AST JSON dumps. Place the headers in the project root and run:

```bash
# GLFW
clang -Xclang -ast-dump=json -fsyntax-only glfw3.h > assets/glfw3.json

# stb_truetype (font rasterizer)
clang -Xclang -ast-dump=json -fsyntax-only stb_truetype.h > assets/stb_truetype.json

# miniaudio (audio)
clang -Xclang -ast-dump=json -fsyntax-only miniaudio.h > assets/miniaudio.json

# FreeType (optional)
clang -Xclang -ast-dump=json -fsyntax-only freetype2/freetype/freetype.h > assets/freetype.json
```

## Regenerating FFI bindings

```bash
bun run build:glfw          # GLFW + OpenGL bindings
bun run build:miniaudio     # MiniAudio bindings
bun run build:freetype      # FreeType bindings
bun run build:truetype      # stb_truetype bindings
```

## Running

```bash
bun install                 # Install dependencies
bun run src/index.ts        # Run the demo app
```
