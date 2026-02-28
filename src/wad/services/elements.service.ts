import { Injectable, linkedSignal, Signal, signal, WritableSignal } from "@angular/core";
import { WadElement } from "../elements/models/element";

interface WadElementMap {
    [key: string]: WadElement
}

@Injectable({
    providedIn: "root"
})
export class ElementsService {
    private readonly _elements = signal<WadElementMap>({});
    readonly elements = this._elements.asReadonly();

    readonly allElements = linkedSignal(() => Object.values(this._elements())).asReadonly();

    /** IDs of focused elements. */
    protected focused: string[] = [];

    add(element: WadElement) {
        const id = element.id;

        if (element.id == undefined) {
            throw new Error(`Element is missing ID property.`);
        }

        if (this._elements()[id] !== undefined) {
            throw new Error(`Element already exists in table.`);
        }

        this._elements.update(e => {
            e[id] = element;
            return e;
        });
    }

    remove(query: WadElement | string) {
        if (typeof query === "string") {
            this.removeById(query);
        } else if (typeof query === "object") {
            this.removeByElement(query);
        } else {
            throw new Error("Unknown query.", { cause: query });
        }
    }

    focus(element: WadElement) {
        if (this.focused.length > 0) {
            this.focused.forEach(id => {
                if (this._elements()[id]) {
                    this._elements()[id].defocus();
                }
            })
        }
        
        if (!this._elements()[element.id]) {
            throw new Error(`Element not found in map: ${element.id}`);
        }

        this._elements()[element.id].focus();
        this.focused.push(element.id);
    }

    private removeById(id: string) {
        if (!this._elements()[id]) {
            throw new Error(`No element with ID ${id} found.`);
        }
        this._elements.update((e) => {
            delete e[id];
            return e;
        });
    }

    private removeByElement(element: WadElement) {
        if (element.id == undefined) {
            throw new Error("Element's ID property is undefined.")
        }
        this.removeById(element.id);
    } 
}