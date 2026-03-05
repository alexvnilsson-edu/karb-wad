import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RenderViewComponent } from "./render-view.component";
import { RectangleWadModel } from "app/wad/elements/rectangle";
import { createCoordinate } from "app/wad/rendering/coordinate";
import { ElementStorageService } from "app/wad/elements/element-storage.service";
import { RenderService } from "app/wad/rendering/render.service";
import { WadModule } from "app/wad/wad.module";
import { CommandInput } from "app/wad/cli/command-input/command-input";

describe("RenderView", () => {
    let component: RenderViewComponent;
    let fixture: ComponentFixture<RenderViewComponent>;

    let renderService: RenderService;
    let elementService: ElementStorageService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RenderViewComponent, WadModule],
            providers: [RenderService, ElementStorageService]
        }).compileComponents();

        fixture = TestBed.createComponent(RenderViewComponent);

        component = fixture.componentInstance;
        component.renderService = TestBed.inject(RenderService);
        component.elementStorage = TestBed.inject(ElementStorageService);
        await fixture.whenStable();
    });

    it("should create component", () => expect(component).toBeTruthy());

    it("should render multiple elements", async () => {
      const create = 100;
      for (let i = 0; i < create; i++) {
        component.elementStorage.add(new RectangleWadModel(createCoordinate(0, 0), createCoordinate(0, 10), createCoordinate(10, 10), createCoordinate(10, 0)));
      }

      fixture.detectChanges();
      await fixture.whenStable();

      expect(component.elements()).toHaveLength(create);

      const instance = fixture.componentInstance;
      const svg = fixture.nativeElement.querySelector("svg");

      console.debug(svg);
    });
});
