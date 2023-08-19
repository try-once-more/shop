import { Injectable, signal } from "@angular/core";
import { Category } from "src/app/products/enums/category.enum";
import { ProductModel } from "src/app/products/models/product.model";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private readonly _cartItems = new Map<Category, Map<ProductModel, number>>();
    private readonly _totalQuantity = signal(0);
    private readonly _totalCost = signal(0);

    totalQuantity = this._totalQuantity.asReadonly();
    totalCost = this._totalCost.asReadonly();

    addToCart(product: ProductModel): void {
        const productMap = this._cartItems.get(product.category) ?? new Map<ProductModel, number>();
        productMap.set(product, (productMap.get(product) ?? 0) + 1);
        this._cartItems.set(product.category, productMap);

        this._totalQuantity.update(value => ++value);
        this._totalCost.update(value => value + product.price);
    }

    removeFromCart(product: ProductModel): void {
        const productMap = this._cartItems.get(product.category);
        if (productMap !== undefined) {
            const quantity = productMap.get(product) ?? 0;
            if (quantity > 0) {
                productMap.delete(product);
                if (productMap.size === 0) {
                    this._cartItems.delete(product.category);
                }
                this._totalQuantity.update(value => value - quantity);
                this._totalCost.update(value => value - quantity * product.price);
            }
        }
    }

    getCartItems(): ReadonlyMap<Category, ReadonlyMap<ProductModel, number>> {
        return this._cartItems as ReadonlyMap<Category, ReadonlyMap<ProductModel, number>>;
    }

    clearCart(): void {
        this._cartItems.clear();
        this._totalQuantity.set(0);
        this._totalCost.set(0);
    }
}
