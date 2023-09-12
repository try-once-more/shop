import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CartService } from "src/app/cart/services/cart.service";
import { firstValueFrom } from 'rxjs';

export const isCartEmptyGuard: CanActivateFn = 
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const products = await firstValueFrom(inject(CartService).getProducts());
        if (products.length > 0) {
            return true;
        }

        inject(Location).back();
        return false;
};