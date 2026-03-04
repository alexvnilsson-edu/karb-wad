import { Transformer } from "app/wad/transformers/transformer";

export abstract class ArgumentType<T> {
  type!: string;
  transformer!: Transformer<T>;

  /**
   *
   */
  constructor(type: string, transformer: Transformer<T>) {
    this.type = type;
    this.transformer = transformer;
  }
}
