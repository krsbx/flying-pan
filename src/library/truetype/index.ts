import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  StbTrueTypeDefinition,
  type StbTrueTypeDefinition as StbTrueTypeDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof StbTrueTypeDefinitionType;

type TranslationsType = typeof Translations;

class BaseStbTrueType implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, StbTrueTypeDefinition);

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

export interface StbTrueType extends BaseStbTrueType, TranslationsType {}

export const StbTrueType = BaseStbTrueType as new (
  ...args: ConstructorParameters<typeof BaseStbTrueType>
) => StbTrueType;
