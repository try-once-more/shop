import { createAction, props } from "@ngrx/store";
import { ProductModel } from "src/app/products/models/product.model";

export const getProducts = createAction(
    "[Get Products App] GET_PRODUCTS"
);
export const getProductsSuccess = createAction(
    "[Get Products Effect] GET_PRODUCTS_SUCCEESS",
    props<{ products: ProductModel[] }>()
);
export const getProductsError = createAction(
    "[Get Products Effect] GET_PRODUCTS_ERROR",
    props<{ error: Error | string | null }>()
);
export const createProduct = createAction(
    "[Create Product App] CREATE_PRODUCT",
    props<{ product: ProductModel }>()
);
export const createProductSuccess = createAction(
    "[Create Product Effect] CREATE_PRODUCT_SUCCESS",
    props<{ product: ProductModel }>()
);
export const updateProduct = createAction(
    "[Update Product App] UPDATE_PRODUCT",
    props<{ product: ProductModel }>()
);
export const updateProductSuccess = createAction(
    "[Update Product Effect] UPDATE_PRODUCT_SUCCESS",
    props<{ product: ProductModel }>()
);
export const createUpdateProductError = createAction(
    "[Create/Update Product Effect] CREATE/UPDATE_PRODUCT_ERROR",
    props<{ error: Error | string | null }>()
);
export const deleteProduct = createAction(
    "[Delete Product App] DELETE_PRODUCT",
    props<{ product: ProductModel }>()
);
export const deleteProductSuccess = createAction(
    "[Delete Product Effect] DELETE_PRODUCT_SUCCESS",
    props<{ product: ProductModel }>()
);
export const deleteProductError = createAction(
    "[Delete Product Effect] DELETE_PRODUCT_ERROR",
    props<{ error: Error | string | null }>()
);