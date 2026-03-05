import { afterEveryRender, afterNextRender, Component, ElementRef, inject, linkedSignal, SimpleChanges } from '@angular/core';
import { ElementService } from '../../wad/elements/element.service';
import { RenderService } from '../../wad/rendering/render.service';
import { WadModule } from '../../wad/wad.module';
import { RenderViewStatusComponent } from './render-view-status/render-view-status.component';
import { createCoordinate } from '../../wad/rendering/coordinate';
import { RenderViewSidebarComponent } from './render-view-sidebar/render-view-sidebar.component';
import { WadElementClickEvent } from '../../wad/elements/element-click.event';
import { RenderViewCanvas } from './render-view-canvas/render-view-canvas';
import { WadElement } from 'app/wad/rendering/element';
import { RectangleWadElement } from 'app/wad/rendering/rectangle';

@Component({
  selector: 'app-render-view',
  templateUrl: './render-view.component.html',
  host: {
    class: 'flex-1 flex flex-col items-stretch',
  },
  imports: [WadModule, RenderViewCanvas, RenderViewStatusComponent, RenderViewSidebarComponent],
})
export class RenderViewComponent {
  private elementRef = inject(ElementRef);

  elementStorage = inject(ElementService);
  renderService = inject(RenderService);

  readonly elements = linkedSignal(() => this.elementStorage.elements());

  readonly allElements = linkedSignal(() => Array.from(this.elements().entries()));

  readonly origin$ = linkedSignal(() => this.renderService.origin());
  readonly area$ = linkedSignal(() => this.renderService.area());

  private isMouseDown = false;

  private measureStart?: number;

  ngOnChanges(changes: SimpleChanges<RectangleWadElement>) {
    console.debug("ngOnChanges");
    this.measureStart = Date.now();

  }

  elementClick(event: WadElementClickEvent) {
    console.debug(`Element clicked: ${event.element.id}`, event);
    this.elementStorage.focus(event.element);
  }

  constructor() {
    afterNextRender(() => {
      const canvas = this.getCanvas();
      this.renderService.setArea(canvas.clientWidth, canvas.clientHeight);
      this.renderService.setHeight(canvas.clientHeight);
    });

    // afterEveryRender(() => {
    //   if (this.measureStart) {
    //     const elapsed = Date.now() - this.measureStart;
    //     console.debug(`render time: ${elapsed} ms`);
    //   }
    // });
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

  mousedown(event: MouseEvent) {
    this.isMouseDown = true;
  }

  mouseup(event: MouseEvent) {
    this.isMouseDown = false;
  }

  mousemove(event: MouseEvent) {
    this.renderService.setCoord(createCoordinate(event.offsetX, event.offsetY));

    if (this.isMouseDown) {
      const [originX, originY] = this.renderService.origin();
      const [x, y] = createCoordinate(event.movementX, event.movementY);

      if (x !== 0 || y !== 0) {
        const coords = createCoordinate(originX - x, originY - y);
        this.renderService.setOrigin(coords);
      }
    }
  }

  click(event: MouseEvent) {
    const [x, y] = [event.offsetX, this.renderService.translateCoordinateY(event.offsetY)];
    this.renderService.canvasClick(x, y);
  }
}
