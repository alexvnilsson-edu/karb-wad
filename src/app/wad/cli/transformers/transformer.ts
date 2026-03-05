export abstract class Transformer<T> {
  abstract transform(value: string): T;
  abstract toString(value: T): string;
}
