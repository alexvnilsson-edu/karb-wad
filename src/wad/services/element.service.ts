import { computed, effect, Injectable, linkedSignal, Signal, signal, WritableSignal } from "@angular/core";
import { WadElement } from "../models/element";
import { filter, from, map } from "rxjs";

type WadElementMap = Map<string, WadElement>;

@Injectable({
    providedIn: "root"
})
export class ElementService {
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
            debugName: `${ElementService.name} effects`
        });

        
    }

    add(element: WadElement) {
        const id = element.id;

        if (element.id == undefined) {
            throw new Error(`Element is missing ID property.`);
        }

        if (this._elements().has(id)) {
            throw new Error(`Element already exists in element map.`);
        }

        this._elements.update(e => {
            e.set(id, element);
            return e;
        });
    }

    update(id: string, element: WadElement) {
        if (!this._elements().has(id)) {
            throw new Error(`Element does not exists in element map.`);
        }

        this._elements.update(e => {
            e.set(id, element);
            return e;
        });
    }
    
    remove(element: WadElement) {
        const id = element.id;

        if (id === undefined) {
            throw new Error("Element ID is undefined.");
        } 

        if (!this._elements().has(id)) {
            throw new Error(`Missing element with ID ${id} in element map.`);
        }

        this._elements.update((e) => {
            e.delete(id);
            return e;
        });
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
}