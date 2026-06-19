import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  ImageDefinition,
  type ImageDefinition as ImageDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof ImageDefinitionType;

type TranslationsType = typeof Translations;

class BaseImage implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, ImageDefinition);

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

export interface Image extends BaseImage, TranslationsType {}

export const Image = BaseImage as new (
  ...args: ConstructorParameters<typeof BaseImage>
) => Image;
