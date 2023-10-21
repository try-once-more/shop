import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productsFeatureKey } from "../app.state";
import { adapter, type ProductsState } from "./products.state";
const selectProductsState = createFeatureSelector<ProductsState>(productsFeatureKey);
export const { selectAll: selectProductsData } = adapter.getSelectors(selectProductsState);
export const selectProductsError = createSelector(selectProductsState, (state: ProductsState) => state.error);
export const selectProductsLoading = createSelector(selectProductsState, (state: ProductsState) => state.loading);