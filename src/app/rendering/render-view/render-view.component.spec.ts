import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RenderViewComponent } from "./render-view.component";
import { RectangleWadModel } from "app/wad/elements/rectangle";
import { createCoordinate } from "app/wad/rendering/coordinate";
import { ElementStorageService } from "app/wad/elements/element-storage.service";
import { RenderService } from "app/wad/rendering/render.service";

describe("RenderView", () => {
    let component: RenderViewComponent;
    let fixture: ComponentFixture<RenderViewComponent>;

    let renderService: RenderService;
    let elementService: ElementStorageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RenderViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RenderViewComponent);
        component = fixture.componentInstance;
        component.renderService = TestBed.inject(RenderService);
        component.elementStorage = TestBed.inject(ElementStorageService);
        await fixture.whenStable();
    });

    it("should create component", () => expect(component).toBeTruthy());

    it("should render multiple elements", () => {
      for (let i = 0; i < 1000; i++) {
        component.elementStorage.add(new RectangleWadModel(createCoordinate(0, 0), createCoordinate(0, 10), createCoordinate(10, 10), createCoordinate(10, 0)));
      }
    });
});
