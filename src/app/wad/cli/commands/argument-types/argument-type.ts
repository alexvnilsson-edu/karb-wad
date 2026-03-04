import { Transformer } from "app/wad/cli/transformers/transformer";

export abstract class ArgumentType<T> {
  type!: string;
  abstract transformer: Transformer<T>;
  abstract help: string;

  /**
   * Construct ArgumentType class.
   */
  constructor(type: string) {
    this.type = type;
  }

  abstract transform(value: string): T;
}
