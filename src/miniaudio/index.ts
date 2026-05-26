import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  MiniAudioDefinition,
  type MiniAudioDefinition as MiniAudioDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof MiniAudioDefinitionType;

type TranslationsType = typeof Translations;

class BaseMiniAudio implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, MiniAudioDefinition);

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

export interface MiniAudio extends BaseMiniAudio, TranslationsType {}

export const MiniAudio = BaseMiniAudio as new (
  ...args: ConstructorParameters<typeof BaseMiniAudio>
) => MiniAudio;
