import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY } from "rxjs";
import { ProductsService } from "../services/products.service";

export const productTitleResolver: ResolveFn<string> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);
        const router = inject(Router);

        const productID = +(route.paramMap.get("productID") ?? NaN);
        if (!isNaN(productID)) {
            const user = productsService.getProducts().find(x => x.id === productID);
            if (user) {
                return `${user.name}`;
            }
        }

        router.navigate([""]);
        return EMPTY;
    };
