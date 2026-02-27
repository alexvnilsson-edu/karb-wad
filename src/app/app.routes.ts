import { Routes } from '@angular/router';
import { HomeRouteComponent } from './routes/home/home-route.component';
import { TestRouteComponent } from './routes/test/test-route.component';

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
