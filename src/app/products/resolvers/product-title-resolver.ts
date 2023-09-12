import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, of, switchMap } from "rxjs";
import { ProductsService } from "../services/products.service";

export const productTitleResolver: ResolveFn<string> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);
        const router = inject(Router);

        const productID = +(route.paramMap.get("productID") ?? NaN);
        if (!isNaN(productID)) {
            return productsService.getProducts().pipe(
                switchMap(products => {
                    const productName = products?.find(x => x.id === productID)?.name;
                    if (productName) {
                        return of(productName);
                    } else {
                        return EMPTY;
                    }
                })
            );
        }

        router.navigate([""]);
        return EMPTY;
    };
