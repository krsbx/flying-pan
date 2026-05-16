export const IS_WINDOWS = process.platform === 'win32';

export const WIDE_STRING_CHAR_SIZE = IS_WINDOWS ? 2 : 4;

export const WIDE_STRING_MAX_SCAN = 4096;
