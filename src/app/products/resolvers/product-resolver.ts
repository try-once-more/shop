import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, of, switchMap } from "rxjs";
import { ProductModel } from "../models/product.model";
import { ProductsService } from "../services/products.service";

export const productResolver: ResolveFn<ProductModel> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);
        const router = inject(Router);

        const productID = Number(route.paramMap.get("productID") || NaN);
        if (Number.isInteger(productID)) {
            return productsService.getProducts().pipe(
                switchMap(products => {
                    const product = products?.find(x => x.id === productID);
                    if (product) {
                        return of(product);
                    } else {
                        return EMPTY;
                    }
                })
            );
        }
        
        router.navigate([""]);
        return EMPTY;
    };
