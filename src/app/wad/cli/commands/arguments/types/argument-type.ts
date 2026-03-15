import { WadCommandArgumentTransformer } from '../transformers/transformer';

export abstract class WadCommandArgumentType<T> {
  /**
   * Name of argument type.
   */
  name!: string;

  abstract transformer: WadCommandArgumentTransformer<T>;
  abstract description: string;
  abstract example: string;

  /**
   * Construct ArgumentType class.
   */
  constructor(name: string) {
    this.name = name;
  }

  abstract transform(value: string): T;
}
