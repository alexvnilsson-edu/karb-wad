import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RenderViewComponent } from "./render-view.component";

describe("RenderView", () => {
    let component: RenderViewComponent;
    let fixture: ComponentFixture<RenderViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RenderViewComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RenderViewComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it("should create component", () => expect(component).toBeTruthy());
});