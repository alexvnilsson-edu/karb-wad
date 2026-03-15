export abstract class WadCommandArgumentTransformer<T> {
  abstract name: string;

  abstract transform(value: string): T;
  abstract toString(value: T): string;
}
