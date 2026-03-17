import { customAlphabet } from 'nanoid';

const generateId = customAlphabet('abcdef0123456789', 8);

export class WadElementModel {
  id = generateId();
  type!: string;

  isFocused = false;

  constructor(type: string) {
    this.type = type;
  }

  focus() {
    this.isFocused = true;
  }

  defocus() {
    this.isFocused = false;
  }
}
