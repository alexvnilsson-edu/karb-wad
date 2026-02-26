import { Routes } from '@angular/router';
import { HomeRouteComponent } from './route-components/home-route/home-route.component';
import { TestRouteComponent } from './route-components/test-route/test-route.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeRouteComponent
    }, {
        path: "test",
        component: TestRouteComponent
    }
];
