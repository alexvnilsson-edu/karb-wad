import { nanoid } from 'nanoid';

const ELEMENT_MODEL_ID_SIZE = 8;

export class WadElementModel {
  id!: string;
  type!: string;

  isFocused = false;

  constructor(type: string) {
    this.id = this.generateId();
    this.type = type;
  }

  focus() {
    this.isFocused = true;
  }

  defocus() {
    this.isFocused = false;
  }

  private generateId(): string {
    return nanoid(ELEMENT_MODEL_ID_SIZE);
  }
}
