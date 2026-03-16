import { NgClass } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { WadElementGroup } from 'app/wad/rendering/elements/element-group';
import { createCoordinates } from '../../wad/rendering/coordinates.type';
import { WadElementService } from '../../wad/rendering/element.service';
import { WadElementActivateEvent } from '../../wad/rendering/elements/element-activate.event';
import { WadRenderService } from '../../wad/rendering/render.service';
import { RenderViewCanvas } from './render-view-canvas/render-view-canvas';
import { RenderViewStatus } from './render-view-status/render-view-status';

import {
  WadCircleElementDirective,
  WadPolylineElementDirective,
  WadRectangleElementDirective,
  WadTriangleElementDirective,
} from 'app/wad/rendering/elements/directives';

const ELEMENT_DIRECTIVES = [
  WadCircleElementDirective,
  WadPolylineElementDirective,
  WadRectangleElementDirective,
  WadTriangleElementDirective,
];

@Component({
  selector: 'app-render-view',
  templateUrl: './render-view.html',
  host: {
    class: 'flex-1 flex flex-col items-stretch',
  },
  imports: [RenderViewCanvas, WadElementGroup, RenderViewStatus, NgClass, ELEMENT_DIRECTIVES],
})
export class RenderView {
  private elementRef = inject(ElementRef);

  elementService = inject(WadElementService);
  renderService = inject(WadRenderService);

  canvasViewChild = contentChild<ElementRef<HTMLElement>>('renderViewCanvas');

  private _canvasResizeObserver!: ResizeObserver;

  readonly elements = computed(() => this.elementService.elements());
  readonly allElements = computed(() => Array.from(this.elements()));

  readonly origin = computed(() => this.renderService.origin());
  readonly area = computed(() => this.renderService.area());
  readonly scale = computed(() => this.renderService.scale() / 100);

  private _isPointerDown = signal(false);
  private _isPanning = signal(false);

  readonly isMouseDown = this._isPointerDown.asReadonly();
  readonly isPanning = this._isPanning.asReadonly();

  onElementClick(event: WadElementActivateEvent) {
    console.debug(`Element clicked: ${event.element.id}`, event);
    this.elementService.focus(event.element);
  }

  onElementActivate(event: WadElementActivateEvent) {
    console.debug(`Element activate: ${event.element.id}`, event);

    if (!event?.element) {
      throw new Error(`Reference to element is undefined.`);
    }

    if (!this.elementService.elements().has(event.element.id)) {
      throw new Error(`Element does not exist: ${event.element.id}`);
    }

    const element = this.elementService.elements().get(event.element.id);

    if (!element) {
      throw new Error(`Element is undefined.`);
    }
  }

  constructor() {
    afterNextRender(() => {
      const canvas = this.getCanvas();
      canvas.addEventListener('resize', (e) => this.onCanvasResize(e));
      this._registerResizeObserver();
      this.setRenderArea();
    });
  }

  private _registerResizeObserver() {
    if (!this._canvasResizeObserver) {
      this._canvasResizeObserver = new ResizeObserver((_) => {
        this.setRenderArea();
      });
    }

    this._canvasResizeObserver.observe(this.getCanvas());
    this._canvasResizeObserver.observe(this.getCanvasContainer());
  }

  private setRenderArea() {
    const dimensions = this.getCanvasDimensions();
    if (dimensions) {
      this.renderService.setArea(dimensions[0], dimensions[1]);
      this.renderService.setHeight(dimensions[1]);
    }
  }

  private getCanvasDimensions() {
    const canvas = this.getCanvas();

    return [canvas.clientWidth, canvas.clientHeight];
  }

  private onCanvasResize(_event: Event) {
    this.setRenderArea();
  }

  protected getCanvas(): HTMLElement {
    const canvas = this.elementRef.nativeElement.querySelector('svg#renderViewCanvas');
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
    this.renderService.setCoord(createCoordinates(event.offsetX, event.offsetY));

    if (this.isMouseDown()) {
      this._isPanning.set(true);
    }

    if (this.isPanning()) {
      const scale = this.renderService.scale() / 100;
      const [originX, originY] = this.renderService.origin();
      const [x, y] = createCoordinates(event.movementX, event.movementY).map((c) => c / scale);

      if (x !== 0 || y !== 0) {
        const coords = createCoordinates(originX - x, originY - y);
        this.renderService.setOrigin(coords);
      }
    }
  }

  wheel(event: WheelEvent) {
    // Revert deltaY and determine max delta of -5 <= deltaY <= 5.
    const deltaY = -event.deltaY > 0 ? 5 : -5;
    const scale = this.renderService.scale();
    const newScale = scale + deltaY;
    this.renderService.setScale(newScale);
  }

  click(event: MouseEvent) {
    const [x, y] = [event.offsetX, this.renderService.translateCoordinateY(event.offsetY)];
    this.renderService.canvasClick(x, y);
  }

  getCircleElement(): WadCircleElementDirective {
    return new WadCircleElementDirective();
  }
}
