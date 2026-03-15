import { NgClass } from '@angular/common';
import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { createCoordinate } from '../../wad/rendering/coordinate.type';
import { WadElementClickEvent } from '../../wad/rendering/element-click.event';
import { WadElementService } from '../../wad/rendering/element.service';
import { WadRenderService } from '../../wad/rendering/render.service';
import { WadModule } from '../../wad/wad.module';
import { RenderViewCanvas } from './render-view-canvas/render-view-canvas';
import { RenderViewStatusComponent } from './render-view-status/render-view-status.component';

@Component({
  selector: 'app-render-view',
  templateUrl: './render-view.component.html',
  host: {
    class: 'flex-1 flex flex-col items-stretch',
  },
  imports: [WadModule, RenderViewCanvas, RenderViewStatusComponent, NgClass],
})
export class RenderViewComponent {
  private elementRef = inject(ElementRef);

  elementService = inject(WadElementService);
  renderService = inject(WadRenderService);

  readonly elements = linkedSignal(() => this.elementService.elements());

  readonly allElements = linkedSignal(() => Array.from(this.elements().entries()));

  readonly origin$ = linkedSignal(() => this.renderService.origin());
  readonly area$ = linkedSignal(() => this.renderService.area());

  readonly scale$ = linkedSignal(() => this.renderService.scale() / 100);

  private _isPointerDown = signal(false);
  private _isPanning = signal(false);

  readonly isMouseDown = this._isPointerDown.asReadonly();
  readonly isPanning = this._isPanning.asReadonly();

  elementClick(event: WadElementClickEvent) {
    console.debug(`Element clicked: ${event.element.id}`, event);
    this.elementService.focus(event.element);
  }

  constructor() {
    afterNextRender(() => {
      const canvas = this.getCanvas();
      this.renderService.setArea(canvas.clientWidth, canvas.clientHeight);
      this.renderService.setHeight(canvas.clientHeight);
    });
  }

  protected getCanvas(): HTMLCanvasElement {
    const canvas = this.elementRef.nativeElement.querySelector('svg#renderView');
    if (canvas == undefined) {
      throw new Error('Canvas not found.');
    }
    return canvas;
  }

  protected getCanvasContainer(): HTMLElement {
    const container = this.elementRef.nativeElement.querySelector('div#renderViewContainer');
    if (container == undefined) {
      throw new Error('Canvas Container not found.');
    }
    return container;
  }

  pointerdown() {
    this._isPointerDown.set(true);
  }

  pointerup() {
    this._isPointerDown.set(false);
    this._isPanning.set(false);
  }

  pointermove(event: PointerEvent) {
    this.renderService.setCoord(createCoordinate(event.offsetX, event.offsetY));

    if (this.isMouseDown()) {
      this._isPanning.set(true);
    }

    if (this.isPanning()) {
      const scale = this.renderService.scale() / 100;
      const [originX, originY] = this.renderService.origin();
      const [x, y] = createCoordinate(event.movementX, event.movementY).map((c) => c / scale);

      if (x !== 0 || y !== 0) {
        const coords = createCoordinate(originX - x, originY - y);
        this.renderService.setOrigin(coords);
      }
    }
  }

  wheel(event: WheelEvent) {
    // Revert deltaY and
    // determine max delta of -5 <= deltaY <= 5.
    const deltaY = -event.deltaY > 0 ? 5 : -5;
    const scale = this.renderService.scale();
    const newScale = scale + deltaY;
    console.debug(`[wheel] delta y: ${deltaY}, old scale: ${scale}, new scale: ${newScale}`);
    this.renderService.setScale(newScale);
  }

  click(event: MouseEvent) {
    const [x, y] = [event.offsetX, this.renderService.translateCoordinateY(event.offsetY)];
    this.renderService.canvasClick(x, y);
  }
}
