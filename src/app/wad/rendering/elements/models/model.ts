import { wadElementModelIdGenerator } from './model-id-generator';

export class WadBaseElementModel {
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
    return wadElementModelIdGenerator();
  }
}
