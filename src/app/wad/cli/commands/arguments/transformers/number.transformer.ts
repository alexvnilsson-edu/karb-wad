import { WadCommandArgumentTransformer } from './transformer';

export class WadNumberCommandArgumentTransformer extends WadCommandArgumentTransformer<number> {
  override name = 'number';

  override transform(value: string) {
    return Number.parseFloat(value);
  }

  override toString(value: number): string {
    return value.toString();
  }
}
