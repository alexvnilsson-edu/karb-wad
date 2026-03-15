import { WadArgumentTransformer } from './transformer';

export class WadArgumentNumberTransformer extends WadArgumentTransformer<number> {
  override transform(value: string) {
    return Number.parseFloat(value);
  }

  override toString(value: number): string {
    return value.toString();
  }
}
