import { Routes } from "@angular/router";
import { CART_ROUTES } from "./cart/cart.routing";
import { PRODUCT_ROUTES } from "./products/product.routing";
import { ADMIN_ROUTES } from "./admin/admin.routing";

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
        path: "**",
        redirectTo: "products-list",
    }
];