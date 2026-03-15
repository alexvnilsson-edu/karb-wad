import { WadArgumentNumberTransformer } from '../../transformers/number.transformer';
import { WadArgumentTransformer } from '../../transformers/transformer';
import { WadArgumentType } from './argument-type';

export class WadNumberArgumentType extends WadArgumentType<number> {
  override transformer: WadArgumentTransformer<number> = new WadArgumentNumberTransformer();
  override description = 'number';
  override example = '1.56';

  constructor() {
    super('number');
  }

  override transform(value: string): number {
    return this.transformer.transform(value);
  }
}
