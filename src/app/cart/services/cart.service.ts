import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { ProductModel } from "src/app/products/models/product.model";
import { ProductsService } from "src/app/products/services/products.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: Map<ProductModel, number> = new Map();
    private _totalQuantity: WritableSignal<number> = signal(0);
    totalQuantity: Signal<number> = this._totalQuantity.asReadonly();
    
    
    constructor(private readonly productsService:ProductsService) {      
    }

    addToCart(product?: ProductModel) {
        const productToAdd = product || this.productsService.getRandomProduct();

        this.cart.set(productToAdd, (this.cart.get(productToAdd) || 0) + 1);
        this._totalQuantity.update(value => ++value);
    }

    getCartItems(): [ProductModel, number][] {
        return Array.from(this.cart);
    }

    clearCart() {
        this.cart.clear();
        this._totalQuantity.set(0);
    }
}
