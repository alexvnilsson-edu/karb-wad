import { computed, effect, Injectable, linkedSignal, Signal, signal, WritableSignal } from "@angular/core";
import { WadModel } from "./element";
import { filter, from, map } from "rxjs";

type WadModelMap = Map<string, WadModel>;
interface WadModelCollection { [key: string]: WadModel }

@Injectable({
    providedIn: "root"
})
export class ElementStorageService {
    private _map = signal(new Map());

    private _elementsMap: WadModelMap = new Map();

    private _elements = signal<WadModelCollection>({});
    readonly elements = this._elements.asReadonly();

    readonly elementMap = this._elementsMap.entries();

    readonly allElements = computed(() => this.elements());

    /** IDs of focused elements. */
    protected focused = linkedSignal(() => {
        const elements = this.elements();
        if (!elements) {
            return [];
        }

        const ids = [];

        for (const key of Object.keys(elements)) {
            const element = this._elements()[key];
            if (element.isFocused) {
                ids.push(element.id);
            }
        }

        return ids;
    });

    constructor() {
        this._map.update(m => m.set("foo", { type: "foo" }));
    }

    add(element: WadModel) {
        const id = element.id;

        if (element.id == undefined) {
            throw new Error(`Element is missing ID property.`);
        }

        if (this._elements()[id]) {
            throw new Error(`Element already exists in element map.`);
        }

        this._elements.update(elements => {
            elements[id] = element;
            return elements;
        });
    }

    update(id: string, element: WadModel) {
        if (!this._elements()[id]) {
            throw new Error(`Element does not exists in element map.`);
        }

        this._elements.update(elements => {
            elements[id] = element;
            return elements;
        });
    }
    
    remove(element: WadModel) {
        const id = element.id;

        if (id === undefined) {
            throw new Error("Element ID is undefined.");
        } 

        if (!this._elements()[id]) {
            throw new Error(`Missing element with ID ${id} in element map.`);
        }

        this._elements.update(elements => {
            delete elements[id];
            return elements;
        });
    }

    focus(element: WadModel) {
        if (this.focused().length > 0) {
            this.focused().forEach(id => {
                if (this._elements()[element.id]) {
                    this._elements.update(elements => {
                        elements[id]!.defocus();
                        return elements;
                    });
                }
            })
        }
        
        if (!this._elements()[element.id]) {
            throw new Error(`Element not found in map: ${element.id}`);
        }

        console.debug(`Focusing element ${element.id}...`);

        this._elements.update(elements => {
            elements[element.id]!.focus();
            return elements;
        });
    }
}