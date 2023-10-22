import { createReducer, on } from "@ngrx/store";
import { adapter, initialProductsState } from "./products.state";
import * as ProductsActions from "./products.actions";

export const productsReducer = createReducer(
    initialProductsState,
    on(ProductsActions.getProducts, state => {
        return { ...state, loading: true };
    }),
    on(ProductsActions.getProductsSuccess, (state, { products }) => {
        return adapter.setAll(products, { ...state, loading: false, loaded: true });
    }),
    on(ProductsActions.getProductsError, (state, { error }) => {
        return { ...state, loading: false, loaded: false, error };
    }),
    on(ProductsActions.createProductSuccess, (state, { product }) => {
        return adapter.addOne(product, state);
    }),
    on(ProductsActions.updateProductSuccess, (state, { product }) => {
        return adapter.updateOne({ id: product.id!, changes: product }, state);
    }),
    on(ProductsActions.deleteProductSuccess, (state, { product }) => {
        return adapter.removeOne(product.id, state);
    }),
);