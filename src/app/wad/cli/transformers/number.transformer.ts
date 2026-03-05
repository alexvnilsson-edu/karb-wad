import { Transformer } from './transformer';

export class NumberTransformer extends Transformer<number> {
  override transform(value: string) {
    return Number.parseFloat(value);
  }

  override toString(value: number): string {
    return value.toString();
  }
}
