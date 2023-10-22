import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { type Action } from "@ngrx/store";
import { type Observable, concatMap, map, switchMap, catchError, of } from "rxjs";
import { ProductsService } from "src/app/products/services/products.service";
import * as ProductsActions from "./products.actions";
import * as RouterActions from "../router/router.actions";
import { ProductModel } from "src/app/products/models/product.model";

@Injectable()
export class ProductsEffects {
    private readonly actions$ = inject(Actions);
    private readonly productsService = inject(ProductsService);

    getProducts$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getProducts),
            switchMap(_ => this.productsService.getProducts()
                .pipe(
                    map(products => ProductsActions.getProductsSuccess({ products })),
                    catchError(error => of(ProductsActions.getProductsError({ error })))
                )
            )
        )
    );

    updateProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.updateProduct),
            map(action => action.product),
            concatMap((product: ProductModel) =>
                this.productsService.updateProduct(product)
                    .pipe(
                        map(product => ProductsActions.updateProductSuccess({ product })),
                        catchError(error => of(ProductsActions.createUpdateProductError({ error })))
                    )
            )
        )
    );

    createProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.createProduct),
            map(action => action.product),
            concatMap((product: ProductModel) =>
                this.productsService.createProduct(product)
                    .pipe(
                        map(product => ProductsActions.createProductSuccess({ product })),
                        catchError(error => of(ProductsActions.createUpdateProductError({ error })))
                    )
            )
        )
    );

    createUpdateProductSuccess$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.createProductSuccess, ProductsActions.updateProductSuccess),
            map(action => RouterActions.back())
        )
    );

    deleteProduct$: Observable<Action> = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.deleteProduct),
            map(action => action.product),
            concatMap((product: ProductModel) =>
                this.productsService.deleteProduct(product)
                    .pipe(
                        map(() => ProductsActions.deleteProductSuccess({ product })),
                        catchError(error => of(ProductsActions.createUpdateProductError({ error })))
                    )

            )
        )
    );
}