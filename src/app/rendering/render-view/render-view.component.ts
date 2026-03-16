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
import { toObservable } from '@angular/core/rxjs-interop';
import { WadElementGroup } from 'app/wad/rendering/element-group';
import { createCoordinates } from '../../wad/rendering/coordinate.type';
import { WadElementClickEvent } from '../../wad/rendering/element-click.event';
import { WadElementService } from '../../wad/rendering/element.service';
import { WadRenderService } from '../../wad/rendering/render.service';
import { WadModule } from '../../wad/wad.module';
import { RenderStatusComponent } from '../render-status/render-status.component';
import { RenderViewCanvas } from './render-view-canvas.component';

@Component({
  selector: 'app-render-view',
  templateUrl: './render-view.component.html',
  host: {
    class: 'flex-1 flex flex-col items-stretch',
  },
  imports: [WadModule, RenderViewCanvas, WadElementGroup, RenderStatusComponent, NgClass],
})
export class RenderViewComponent {
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

  elementClick(event: WadElementClickEvent) {
    console.debug(`Element clicked: ${event.element.id}`, event);
    this.elementService.focus(event.element);
  }

  constructor() {
    toObservable(this.canvasViewChild).subscribe((canvas) => {
      if (canvas) {
        console.debug(`${this.canvasViewChild.name} got value:`, canvas);
      }
    });

    afterNextRender(() => {
      const canvas = this.getCanvas();
      canvas.addEventListener('resize', (e) => this.onCanvasResize(e));
      this._registerResizeObserver();
      this.setRenderArea();
    });
  }

  private _registerResizeObserver() {
    if (!this._canvasResizeObserver) {
      this._canvasResizeObserver = new ResizeObserver((entries) => {
        console.debug(`${this._registerResizeObserver.name}`, entries);
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
}
