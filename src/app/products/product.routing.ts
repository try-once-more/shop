import { Routes } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { productTitleResolver } from "./resolvers/product-title-resolver";
import { productResolver } from "./resolvers/product-resolver";
import { ProductViewComponent } from "./components/product-view/product-view.component";
import { productsStatePreloadingGuard } from "./resolvers/products-state-preloading.guard";
import { productsExistsGuard } from "./resolvers/product-exists.guard";

export const PRODUCT_ROUTES: Routes = [
    { 
        path: "products-list", 
        component: ProductListComponent,
        canActivate: [productsStatePreloadingGuard]
    },
    {
        path: "product/:productID",
        component: ProductViewComponent,
        canActivate: [productsExistsGuard],
        title: productTitleResolver,
        resolve: {
            product: productResolver
        },
    },
];
