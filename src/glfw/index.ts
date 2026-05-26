import { dlopen, type ConvertFns, type Library } from 'bun:ffi';
import {
  GLFWDefinition,
  type GLFWDefinition as GLFWDefinitionType,
} from './constant';
import * as Translations from './functions';

type FFISymbols = typeof GLFWDefinitionType;

type TranslationsType = typeof Translations;

class BaseGLFW implements Library<FFISymbols> {
  public readonly close: () => void;
  public readonly symbols: ConvertFns<FFISymbols>;

  public constructor(filePath: string) {
    const lib = dlopen(filePath, GLFWDefinition);

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

export interface GLFW extends BaseGLFW, TranslationsType {}

export const GLFW = BaseGLFW as new (
  ...args: ConstructorParameters<typeof BaseGLFW>
) => GLFW;
