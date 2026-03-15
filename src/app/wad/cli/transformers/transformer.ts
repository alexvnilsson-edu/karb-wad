export abstract class WadArgumentTransformer<T> {
  abstract transform(value: string): T;
  abstract toString(value: T): string;
}
