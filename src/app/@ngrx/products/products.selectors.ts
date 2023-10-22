import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productsFeatureKey } from "../app.state";
import { adapter, type ProductsState } from "./products.state";
import { selectRouterState } from "../router/router.selectors";
import { ProductModel } from "src/app/products/models/product.model";

const selectProductsState = createFeatureSelector<ProductsState>(productsFeatureKey);
export const {
    selectAll: selectProductsData,
    selectEntities: selectProductsEntitites
 } = adapter.getSelectors(selectProductsState);
export const selectProductsLoading = createSelector(selectProductsState, (state: ProductsState) => state.loading);
export const selectProductsLoaded = createSelector(selectProductsState, (state: ProductsState) => state.loaded);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectSelectedProductByUrl = createSelector(
    selectProductsEntitites,
    selectRouterState,
    (products, router): ProductModel | null => {
        const productID = router.state.params["productID"];
        if (productID && products) {
            return products[productID] as ProductModel;
        } else {
            return null;
        }
    }
);