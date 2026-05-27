import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  TrueTypeDefinition,
  type TrueTypeDefinition as TrueTypeDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof TrueTypeDefinitionType;

type TranslationsType = typeof Translations;

class BaseTrueType implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, TrueTypeDefinition);

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

export interface TrueType extends BaseTrueType, TranslationsType {}

export const TrueType = BaseTrueType as new (
  ...args: ConstructorParameters<typeof BaseTrueType>
) => TrueType;
