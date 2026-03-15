import { customAlphabet } from 'nanoid';

const ELEMENT_MODEL_ID_SIZE = 8;
const ELEMENT_MODEL_ID_ALPHABET = 'abcdef0123456789';
const ELEMENT_MODEL_ID_GENERATOR = customAlphabet(ELEMENT_MODEL_ID_ALPHABET, ELEMENT_MODEL_ID_SIZE);

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
    return ELEMENT_MODEL_ID_GENERATOR(ELEMENT_MODEL_ID_SIZE);
  }
}
