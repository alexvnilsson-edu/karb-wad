import { Injectable, linkedSignal, signal } from '@angular/core';
import { WadElementModel } from './element.model';

@Injectable({
  providedIn: 'root',
})
export class WadElementService {
  private _elements = signal<Map<string, WadElementModel>>(new Map());
  readonly elements = this._elements.asReadonly();

  private _focusedElement = signal<WadElementModel | undefined>(undefined);
  readonly focusedElement = this._focusedElement.asReadonly();

  /** IDs of focused elements. */
  protected focused = linkedSignal(() => {
    const elements = this.elements();
    if (!elements) {
      return [];
    }

    const ids: string[] = [];

    for (const element of this._elements().values()) {
      if (element.isFocused) {
        ids.push(element.id);
      }
    }

    return ids;
  });

  add(element: WadElementModel) {
    const id = element.id;

    if (element.id == undefined) {
      throw new Error(`Element is missing ID property.`);
    }

    if (this._elements().has(id)) {
      throw new Error(`Element already exists in element map.`);
    }

    this._elements.update((elements) => {
      elements.set(id, element);
      return elements;
    });
  }

  update(id: string, element: WadElementModel) {
    if (!this._elements().has(id)) {
      throw new Error(`Element does not exists in element map.`);
    }

    this._elements.update((elements) => {
      elements.set(id, element);
      return elements;
    });
  }

  remove(element: WadElementModel) {
    const id = element.id;

    if (id === undefined) {
      throw new Error('Element ID is undefined.');
    }

    if (!this._elements().has(id)) {
      throw new Error(`Missing element with ID ${id} in element map.`);
    }

    this._elements.update((elements) => {
      elements.delete(id);
      return elements;
    });
  }

  focus(element: WadElementModel) {
    if (this.focused().length > 0) {
      this.focused().forEach((id) => {
        if (this._elements().has(element.id)) {
          this._elements.update((elements) => {
            elements.get(id)!.defocus();
            return elements;
          });
        }
      });
    }

    if (!this._elements().get(element.id)) {
      throw new Error(`Element not found in map: ${element.id}`);
    }

    console.debug(`Focusing element ${element.id}...`);

    this._elements.update((elements) => {
      elements.get(element.id)!.focus();
      return elements;
    });
  }
}
