import { Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { WadElement } from "../models/wad-element";

@Injectable({
    providedIn: "root"
})
export class ElementsService {
    private readonly _elements = signal<WadElement[]>([]);
    readonly elements = this._elements.asReadonly();

    add(element: WadElement) {
        const id = element.id;

        if (element.id == undefined) {
            throw new Error(`Element is missing ID property.`, { cause: element });
        }

        if (this._elements().find(e => e.id === id) !== undefined) {
            throw new Error(`Element already exists in table.`, { cause: element });
        }

        this._elements().push(element);
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

    private removeById(id: string) {
        const index = this.elements().findIndex(e => e.id === id);
        if (index === -1) {
            throw new Error(`No element with ID ${id} found.`);
        }
        this.elements().splice(index, 1);
    }

    private removeByElement(element: WadElement) {
        if (element.id == undefined) {
            throw new Error("Element's ID property is undefined.")
        }
        this.removeById(element.id);
    } 
}