import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartService } from "src/app/cart/services/cart.service";

export const isCartEmptyGuard: CanActivateFn = 
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const isEmptyCart = inject(CartService).isEmptyCart();
        if (isEmptyCart) {
            inject(Location).back();
        }

        return !isEmptyCart;
};