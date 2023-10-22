import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { ResolveFn } from "@angular/router";
import { of, catchError } from "rxjs";
import { loadProducts } from "./load-products.function";

export const productsStatePreloadingGuard: ResolveFn<boolean> =
    (route, state) => {
        const store = inject(Store);
        return loadProducts(store).pipe(
            catchError(() => of(false)));
    };