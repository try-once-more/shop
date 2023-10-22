import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map, take } from "rxjs";
import { Store } from "@ngrx/store";
import { selectSelectedProductByUrl } from "src/app/@ngrx/products/products.selectors";

export const productTitleResolver: ResolveFn<string> =
    (route, state) => {
        const store = inject(Store);
        return store.select(selectSelectedProductByUrl).pipe(
            map(product => product?.name ?? ""),
            take(1)
        );
    };