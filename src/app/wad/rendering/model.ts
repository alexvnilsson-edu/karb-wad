import { nanoid } from 'nanoid';

export class WadModel {
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
    return nanoid();
  }
}
