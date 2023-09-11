import { Routes } from '@angular/router';
import { CartListComponent } from "./components/cart-list/cart-list.component";
import { ProcessOrderComponent } from "./components/process-order/process-order.component";
import { isCartEmptyGuard } from "../core/guards/is-cart-empty.guard";


export const CART_ROUTES: Routes = [
    {
        path: "cart",
        children: [
            {
                path: "",
                pathMatch: "full",
                component: CartListComponent
            },
            {
                path: "order",
                pathMatch: "full",
                component: ProcessOrderComponent,
                canActivate: [isCartEmptyGuard]
            }
        ]
    }
];