import { WadArgumentTransformer } from 'app/wad/cli/transformers/transformer';

export abstract class WadArgumentType<T> {
  type!: string;
  abstract transformer: WadArgumentTransformer<T>;
  abstract description: string;
  abstract example: string;

  /**
   * Construct ArgumentType class.
   */
  constructor(type: string) {
    this.type = type;
  }

  abstract transform(value: string): T;
}
