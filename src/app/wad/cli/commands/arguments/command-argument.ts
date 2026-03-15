import { WadCommandArgumentType } from './types/argument-type';

export class WadCommandArgument<T> {
  name!: string;
  description!: string;
  type!: WadCommandArgumentType<T>;

  private _value!: string;

  /**
   * Creates an instance of WadCommandArgument.
   *
   * @constructor
   * @param {string} name Command argument name.
   * @param {string} description Short description of argument.
   * @param {WadCommandArgumentType<T>} type Argument type.
   */
  constructor(name: string, description: string, type: WadCommandArgumentType<T>) {
    this.name = name;
    this.description = description;
    this.type = type;
  }

  get raw(): string {
    return this._value;
  }

  get value(): T {
    return this.type.transformer.transform(this._value);
  }

  set value(value: string) {
    this._value = value;
  }

  get isValid() {
    if (this.value === undefined) {
      return false;
    }

    return true;
  }
}
