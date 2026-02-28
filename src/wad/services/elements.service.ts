import { computed, effect, Injectable, linkedSignal, Signal, signal, WritableSignal } from "@angular/core";
import { WadElement } from "../models/element";
import { filter, from, map } from "rxjs";

type WadElementMap = Map<string, WadElement>;

@Injectable({
    providedIn: "root"
})
export class ElementsService {
    private readonly _elements = signal<WadElementMap>(new Map<string, WadElement>());
    readonly elements = this._elements.asReadonly();

    readonly allElements = linkedSignal(() => this._elements().values()).asReadonly();

    /** IDs of focused elements. */
    protected focused = linkedSignal(() => {
        const elements = this.elements();
        if (!elements) {
            return [];
        }

        from(this.elements().values()).pipe(filter(v => v.isFocused), map(v => v.id)).subscribe(function (ids) {
            console.debug("focused: ", ids);
        }).unsubscribe();

        const ids = [];

        for (const element of elements.values()) {
            if (element.isFocused) {
                ids.push(element.id);
            }
        }

        return ids;
    });

    constructor() {
        effect(() => {
            this.elements().forEach((element, key, map) => {
            
        });
        }, { 
            debugName: `${ElementsService.name} effects`
        });

        
    }

    add(element: WadElement) {
        const id = element.id;

        if (element.id == undefined) {
            throw new Error(`Element is missing ID property.`);
        }

        if (this._elements().has(id)) {
            throw new Error(`Element already exists in table.`);
        }

        this._elements.update(e => {
            e.delete(id);
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
        if (this.focused().length > 0) {
            this.focused().forEach(id => {
                if (this._elements().has(element.id)) {
                    this._elements.update(e => {
                        e.get(id)!.defocus();
                        return e;
                    });
                }
            })
        }
        
        if (!this._elements().has(element.id)) {
            throw new Error(`Element not found in map: ${element.id}`);
        }

        console.debug(`Focusing element ${element.id}...`);

        this._elements.update(e => {
            e.get(element.id)!.focus();
            return e;
        });
    }

    private removeById(id: string) {
        if (!this._elements().has(id)) {
            throw new Error(`No element with ID ${id} found.`);
        }
        this._elements.update((e) => {
            e.delete(id);
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