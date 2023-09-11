import { Routes } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductComponent } from "./components/product/product.component";
import { productTitleResolver } from "./resolvers/product-title-resolver";
import { productResolver } from "./resolvers/product-resolver";

export const PRODUCT_ROUTES: Routes = [
    { path: "products-list", component: ProductListComponent },
    {
        path: "product/:productID",
        component: ProductComponent,
        title: productTitleResolver,
        resolve: {
            product: productResolver
        }
    },
];
