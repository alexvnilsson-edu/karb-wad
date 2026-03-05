import { NumberTransformer } from '../../transformers/number.transformer';
import { Transformer } from '../../transformers/transformer';
import { ArgumentType } from './argument-type';

export class NumberArgumentType extends ArgumentType<number> {
  override transformer: Transformer<number> = new NumberTransformer();
  override help: string = 'n (example: 1.56)';

  constructor() {
    super('number');
  }

  override transform(value: string): number {
    return this.transformer.transform(value);
  }
}
