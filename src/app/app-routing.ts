import { Routes } from "@angular/router";
import { CART_ROUTES } from "./cart/cart.routing";
import { PRODUCT_ROUTES } from "./products/product.routing";
import { ADMIN_ROUTES } from "./admin/admin.routing";
import { Error404Component } from "./core/components/errors/error-404.component";
import { Error403Component } from "./core/components/errors/error-403.component";

export const APP_ROUTES: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "products-list"
    },
    ...PRODUCT_ROUTES,
    ...CART_ROUTES,
    ...ADMIN_ROUTES,
    {
        path: "403",
        component: Error403Component,
    },
    {
        path: "**",
        component: Error404Component,
    }
];