import { Routes } from '@angular/router';
import { ProductListComponent } from "./components/product-list/product-list.component";
import { productTitleResolver } from "./resolvers/product-title-resolver";
import { productResolver } from "./resolvers/product-resolver";
import { ProductViewComponent } from "./components/product-view/product-view.component";

export const PRODUCT_ROUTES: Routes = [
    { path: "products-list", component: ProductListComponent },
    {
        path: "product/:productID",
        component: ProductViewComponent,
        title: productTitleResolver,
        resolve: {
            product: productResolver
        }
    },
];
