import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import type { ResolveFn } from "@angular/router";
import { map, take, tap } from "rxjs";
import { selectSelectedProductByUrl } from "../../@ngrx/products/products.selectors";
import * as RouterActions from "./../../@ngrx/router/router.actions";

export const productsExistsGuard: ResolveFn<boolean> =
    (route, state) => {
        const store = inject(Store);
        return inject(Store).select(selectSelectedProductByUrl).pipe(
            map(product => !!product),
            tap(exist => {
                if (!exist) {
                    store.dispatch(RouterActions.back());
                }
            }),
            take(1)
        );
    };

