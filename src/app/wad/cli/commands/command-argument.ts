import { Coordinate } from "app/wad/rendering/coordinate";
import { Transformer } from "../../transformers/transformer";

export class WadCommandArgument<T> {
    name!: string;
    transformer?: string;
    example!: string;

    private _value!: T;

    constructor(name: string, example: string, transformer?: string) {
        this.name = name;
        this.example = example;
        if (transformer) {
          this.transformer = transformer;
        }
    }

    get value(): T {
        // if (this.transformer) {
        //     return this.transformer.to(this._value as string);
        // }

        return this._value;
    }

    set value(value: T) {
        // if (this.transformer) {
        //     this._value = this.transformer.from(value as T);
        // } else {
        //     this._value = value;
        // }
        this._value = value;
    }

    get isValid() {
        if (this.value === undefined) {
            return false;
        }

        return true;
    }
}
