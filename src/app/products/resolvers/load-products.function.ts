import { Store } from "@ngrx/store";
import { type Observable, tap, filter, take } from "rxjs";

import { selectProductsLoaded } from "../../@ngrx/products/products.selectors";
import * as ProductsActions from "../../@ngrx/products/products.actions";

export function loadProducts(store: Store): Observable<boolean> {
    return store.select(selectProductsLoaded).pipe(
        tap((loaded: boolean) => {
            if (!loaded) {
                store.dispatch(ProductsActions.getProducts());
            }
        }),
        filter((loaded: boolean) => loaded),
        take(1)
    );
}