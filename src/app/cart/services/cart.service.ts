import { Injectable, Signal, WritableSignal, signal } from "@angular/core";
import { ProductModel } from "src/app/products/models/product.model";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private cart: Map<ProductModel, number> = new Map();
    private _totalQuantity: WritableSignal<number> = signal(0);
    private _totalCost: WritableSignal<number> = signal(0);
    totalQuantity: Signal<number> = this._totalQuantity.asReadonly();
    totalCost: Signal<number> = this._totalCost.asReadonly();

    addToCart(product: ProductModel) {
        this.cart.set(product, (this.cart.get(product) || 0) + 1);
        this._totalQuantity.update(value => ++value);
        this._totalCost.update(value => value + product.price);
    }

    removeFromCart(product: ProductModel) {
        const quantity = this.cart.get(product) || 0;
        if (quantity > 0) {
            this.cart.delete(product);
            this._totalQuantity.update(value => value - quantity);
            const totalCost = Array.from(this.cart)
                .map(i => i[1] * i[0].price)
                .reduce((total, value) => total + value, 0);
            this._totalCost.update(_ => totalCost);
        }
    }

    getCartItems(): [ProductModel, number][] {
        return Array.from(this.cart);
    }

    clearCart() {
        this.cart.clear();
        this._totalQuantity.set(0);
    }
}
