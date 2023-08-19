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

    getCartItems(): [ProductModel, number][] {
        return Array.from(this.cart);
    }

    clearCart() {
        this.cart.clear();
        this._totalQuantity.set(0);
    }
}
