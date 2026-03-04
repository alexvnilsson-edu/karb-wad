import { Coordinate } from "app/wad/rendering/coordinate";
import { Transformer } from "../transformers/transformer";
import { ArgumentType } from "./argument-types/argument-type";

export class WadCommandArgument<T> {
    name!: string;
    type!: ArgumentType<T>;

    private _value!: string;

    constructor(name: string, type: ArgumentType<T>) {
        this.name = name;
        this.type = type;
    }

    get raw(): string {
      return this._value;
    }

    get value(): T {
        return this.type.transformer.transform(this._value);
    }

    set value(value: string) {
        this._value = value;
    }

    get isValid() {
        if (this.value === undefined) {
            return false;
        }

        return true;
    }
}
