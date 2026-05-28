// GL constants — these are #define macros, not parsed by clang AST dump

// Clear bits
export const GL_COLOR_BUFFER_BIT = 0x00004000;
export const GL_DEPTH_BUFFER_BIT = 0x00000100;
export const GL_STENCIL_BUFFER_BIT = 0x00000400;

// Boolean
export const GL_FALSE = 0;
export const GL_TRUE = 1;

// Matrix modes
export const GL_MODELVIEW = 0x1700;
export const GL_PROJECTION = 0x1701;
export const GL_TEXTURE = 0x1702;

// Begin/end modes
export const GL_POINTS = 0x0000;
export const GL_LINES = 0x0001;
export const GL_LINE_LOOP = 0x0002;
export const GL_LINE_STRIP = 0x0003;
export const GL_TRIANGLES = 0x0004;
export const GL_TRIANGLE_STRIP = 0x0005;
export const GL_TRIANGLE_FAN = 0x0006;
export const GL_QUADS = 0x0007;
export const GL_QUAD_STRIP = 0x0008;
export const GL_POLYGON = 0x0009;

// Enable caps
export const GL_BLEND = 0x0be2;
export const GL_DEPTH_TEST = 0x0b71;
export const GL_SCISSOR_TEST = 0x0c11;

// Blend factors
export const GL_SRC_ALPHA = 0x0302;
export const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
export const GL_ONE = 1;

// Data types
export const GL_FLOAT = 0x1406;
export const GL_UNSIGNED_BYTE = 0x1401;
export const GL_UNSIGNED_INT = 0x1405;

// Draw buffer
export const GL_FRONT = 0x0404;
export const GL_BACK = 0x0405;
export const GL_FRONT_AND_BACK = 0x0408;

// Texture
export const GL_TEXTURE_2D = 0x0de1;
export const GL_RGBA = 0x1908;
export const GL_RGB = 0x1907;
export const GL_ALPHA = 0x1906;

// Texture filter
export const GL_TEXTURE_MIN_FILTER = 0x2801;
export const GL_TEXTURE_MAG_FILTER = 0x2800;
export const GL_NEAREST = 0x2600;
export const GL_LINEAR = 0x2601;
