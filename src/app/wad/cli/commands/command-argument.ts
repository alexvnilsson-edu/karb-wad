export class WadCommandArgument<T> {
    name!: string;
    prompt!: string;
    
    private _value!: T;

    constructor(name: string, prompt?: string) {
        this.name = name;
        this.prompt = prompt ?? name;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get isValid() {
        if (this.value === undefined) {
            return false;
        }

        return true;
    }
}