import { ElementRef, inject, Injectable, Signal, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RenderingService {
    private _height = signal(0);   

    height = this._height.asReadonly();

    setHeight(height: number) {
        this._height.update(h => h = height);
    }
}