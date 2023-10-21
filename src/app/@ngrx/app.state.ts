import { ProductsState } from "./products/products.state";

export const productsFeatureKey = "products";
export interface AppState {
    [productsFeatureKey]: ProductsState;
}