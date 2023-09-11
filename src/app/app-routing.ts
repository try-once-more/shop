import { Routes } from "@angular/router";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { ProductComponent } from "./products/components/product/product.component";
import { productResolver } from "./products/resolvers/product-resolver";
import { productTitleResolver } from "./products/resolvers/product-title-resolver";
import { CartListComponent } from "./cart/components/cart-list/cart-list.component";

export const APP_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "products-list",
        pathMatch: "full"
    },
    { path: "products-list", component: ProductListComponent },
    { 
        path: "product/:productID",
        component: ProductComponent,
        title: productTitleResolver,
        resolve: {
            product: productResolver
        }
    },
    { path: "cart", component: CartListComponent },
    {
        path: "**",
        redirectTo: "products-list",
        pathMatch: "full"
    },
];
