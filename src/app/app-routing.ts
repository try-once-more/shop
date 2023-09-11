import { Routes } from "@angular/router";
import { productRoutes } from "./products/product.routing";
import { cartRoutes } from "./cart/cart.routing";

export const APP_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "products-list",
        pathMatch: "full"
    },
    ...productRoutes,
    ...cartRoutes,
    {
        path: "**",
        redirectTo: "products-list",
        pathMatch: "full"
    },
];
