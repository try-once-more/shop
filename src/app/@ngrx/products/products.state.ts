import { ProductModel } from "src/app/products/models/product.model";
import { createEntityAdapter, type EntityState, type EntityAdapter } from "@ngrx/entity";

export interface ProductsState extends EntityState<ProductModel> {
    readonly loading: boolean;
    readonly loaded: boolean;
    readonly error: Error | string | null;
}

export const adapter: EntityAdapter<ProductModel> = createEntityAdapter<ProductModel>({
    selectId: (model: ProductModel) => model.id,
});

export const initialProductsState: ProductsState = adapter.getInitialState({
    loading: false,
    loaded: false,
    error: null
});