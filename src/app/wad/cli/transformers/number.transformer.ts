import { Transformer } from "./transformer";

export class NumberTransformer extends Transformer<number> {
  constructor() {
    super("number");
  }

  static create() {
    return new NumberTransformer();
  }

  override transform(value: string) {
    return Number.parseFloat(value);
  }

  override toString(value: number): string {
    return value.toString();
  }
}
