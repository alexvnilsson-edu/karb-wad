import { WadBaseElementModel } from './elements/models/model';

export class WadElementMap<T> extends Map<T, WadBaseElementModel> {
  last: T = undefined!;

  override set(key: T, value: WadBaseElementModel): this {
    this.last = key;
    super.set(key, value);
    return this;
  }
}
