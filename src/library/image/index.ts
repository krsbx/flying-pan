import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  StbImageDefinition,
  type StbImageDefinition as StbImageDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof StbImageDefinitionType;

type TranslationsType = typeof Translations;

class BaseStbImage implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, StbImageDefinition);

    this.symbols = lib.symbols;
    this.close = () => lib.close();

    Object.entries(Translations).forEach(([key, value]) => {
      (this as Record<string, unknown>)[key] = (
        value as (...args: unknown[]) => unknown
      ).bind(this);
    });
  }

  public [Symbol.dispose]() {
    this.close();
  }
}

export interface StbImage extends BaseStbImage, TranslationsType {}

export const StbImage = BaseStbImage as new (
  ...args: ConstructorParameters<typeof BaseStbImage>
) => StbImage;
