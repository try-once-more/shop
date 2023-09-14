import { Routes } from '@angular/router';
import { AdminComponent } from "./components/admin/admin.component";
import { ProductListComponent } from "../products/components/product-list/product-list.component";
import { isAdminGuard } from "../core/guards/is-admin.guard";
import { ProductViewComponent } from "../products/components/product-view/product-view.component";
import { OrdersComponent } from "../order/components/orders/orders.component";
import { productResolver } from "../products/resolvers/product-resolver";

export const ADMIN_ROUTES: Routes = [
    {
        path: "admin",
        canActivate: [isAdminGuard],
        component: AdminComponent,
        children: [
            {
                path: "orders",
                component: OrdersComponent
            },
            {
                path: "products",
                component: ProductListComponent
            },
            {
                path: "product/add",
                component: ProductViewComponent
            },
            {
                path: "product/edit/:productID",
                component: ProductViewComponent,
                resolve: {
                    product: productResolver
                }
            }
        ]
    }
];