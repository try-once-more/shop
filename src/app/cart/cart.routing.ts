import { Routes } from '@angular/router';
import { CartListComponent } from "./components/cart-list/cart-list.component";
import { ProcessOrderComponent } from "../order/components/process-order/process-order.component";
import { isCartEmptyGuard } from "../core/guards/is-cart-empty.guard";


export const CART_ROUTES: Routes = [
    {
        path: "cart",
        component: CartListComponent
    },
    {
        path: "cart/order",
        component: ProcessOrderComponent,
        canActivate: [isCartEmptyGuard]
    }
];