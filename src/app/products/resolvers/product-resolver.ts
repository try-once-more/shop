import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { EMPTY, of, switchMap } from "rxjs";
import { ProductModel } from "../models/product.model";
import { ProductsService } from "../services/products.service";

export const productResolver: ResolveFn<ProductModel> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const productsService = inject(ProductsService);
        const router = inject(Router);

        const productID = +(route.paramMap.get("productID") ?? NaN);
		// Глобальная функция isNaN преобразует тестируемое значение в число,
		// а затем проверяет, является ли оно NaN.
		// Это может привести к неправильным результатам для некоторых значений,
		// которые не являются числами, но могут быть преобразованы в них.
		// Например, isNaN("1") вернет false, потому что строка "1"
		// может быть преобразована в число 1
		// Number.isNaN не преобразует тестируемое значение в число и
		// возвращает true только для значений типа Number,
		// которые равны NaN.
		// Это более надежный способ проверки на NaN,
		// так как он не зависит от принудительного преобразования типов.
        if (!Number.isNaN(productID)) {
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
