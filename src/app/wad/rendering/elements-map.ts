import { WadElementModel } from './element.model';

export class WadElementMap<T> extends Map<T, WadElementModel> {
  last: T = undefined!;

  override set(key: T, value: WadElementModel): this {
    this.last = key;
    super.set(key, value);
    return this;
  }
}
