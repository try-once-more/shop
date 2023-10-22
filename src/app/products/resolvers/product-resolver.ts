import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngrx/store";
import { take } from "rxjs";
import { selectSelectedProductByUrl } from "src/app/@ngrx/products/products.selectors";
import { ProductModel } from "../models/product.model";

export const productResolver: ResolveFn<ProductModel | null> =
    (route, state) => {
        const store = inject(Store);
        return store.select(selectSelectedProductByUrl).pipe(
            take(1)
        );
    };