import { Routes } from '@angular/router';
import { ProductListComponent } from "./products/components/product-list/product-list.component";

export const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full'
    },
    { path: 'products-list', component: ProductListComponent },
    {
        path: '**',
        redirectTo: 'products-list',
        pathMatch: 'full'
    },
];
