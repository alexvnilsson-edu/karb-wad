import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RenderViewComponent } from './render-view.component';
import { RectangleWadModel } from 'app/wad/elements/rectangle';
import { createCoordinate } from 'app/wad/rendering/coordinate';
import { ElementService } from 'app/wad/elements/element.service';
import { RenderService } from 'app/wad/rendering/render.service';
import { WadModule } from 'app/wad/wad.module';
import { Component } from '@angular/core';
import { WadModel } from 'app/wad/elements/element';

@Component({
  imports: [
    WadModule
  ],
  template: `<svg width="200" height="200" viewBox="0 0 200 200">
    @for (entry of elements; track entry[1].id) {
      @let element = entry[1];
      @switch (element.type) {
        @case ("rectangle") {
          <rect wad-rectangle [element]="element"></rect>
        }
      }
    }
  </svg>`
})
class RenderViewTestHost {
  elements: WadModel[] = [];

}


describe('RenderView', () => {
  let component: RenderViewTestHost;
  let fixture: ComponentFixture<RenderViewTestHost>;

  let renderService: RenderService;
  let elementService: ElementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WadModule]
    }).compileComponents();

    fixture = TestBed.createComponent(RenderViewTestHost);

    component = fixture.componentInstance;
    renderService = TestBed.inject(RenderService);
    elementService = TestBed.inject(ElementService);

    renderService.setArea(200, 200);
    renderService.setHeight(200);

    await fixture.whenStable();
  });

  it('should create component', () => expect(component).toBeTruthy());

  it('should render multiple elements', async () => {
    const create = 100;
    for (let i = 0; i < create; i++) {
      component.elements.push(
        new RectangleWadModel(
          createCoordinate(0, 0),
          createCoordinate(0, 10),
          createCoordinate(10, 10),
          createCoordinate(10, 0),
        ),
      );
    }

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.elements).toHaveLength(create);

    const svg = fixture.nativeElement.querySelector('svg');

    console.debug(svg);
  });
});
