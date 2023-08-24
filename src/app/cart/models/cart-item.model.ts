import { ProductModel } from "src/app/products/models/product.model";

export interface CartItemModel {
    product: ProductModel;
    quantity: number;
    cost: number;
}