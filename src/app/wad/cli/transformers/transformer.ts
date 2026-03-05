export abstract class Transformer<T> {
  type!: string;

  /**
   * Construct the transformer class.
   *
   * @param type Name of the transformer type.
   */
  constructor(type: string) {
    this.type = type;
  }

  abstract transform(value: string): T;
  abstract toString(value: T): string;
}
