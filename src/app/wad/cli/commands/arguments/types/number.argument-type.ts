import { WadNumberCommandArgumentTransformer } from '../transformers/number.transformer';
import { WadCommandArgumentTransformer } from '../transformers/transformer';
import { WadCommandArgumentType } from './argument-type';

export class WadNumberArgumentType extends WadCommandArgumentType<number> {
  static TypeName = 'number';

  override transformer: WadCommandArgumentTransformer<number> =
    new WadNumberCommandArgumentTransformer();
  override description = 'n';
  override example = '1.56';

  constructor() {
    super(WadNumberArgumentType.TypeName);
  }

  override transform(value: string): number {
    return this.transformer.transform(value);
  }
}
