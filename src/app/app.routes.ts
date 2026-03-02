import { Routes } from '@angular/router';
import { HomeRouteComponent } from './routing/home/home-route.component';
import { TestRouteComponent } from './routing/test/test-route.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeRouteComponent,
        title: "Drawing"
    }, {
        path: "test",
        component: TestRouteComponent,
        title: "Rendering Test"
    }
];
