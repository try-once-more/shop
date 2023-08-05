import { Injectable } from '@angular/core';
import { ProductModel } from "src/app/products/models/product.model";
import { ProductsService } from "src/app/products/services/products.service";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    totalQuantity: number = 0;
    private cart: Map<ProductModel, number> = new Map();

    constructor(private readonly productsService:ProductsService) {      
    }

    addToCart(product?: ProductModel) {
        const productToAdd = product || this.productsService.getRandomProduct();

        this.cart.set(productToAdd, (this.cart.get(productToAdd) || 0) + 1);
        this.totalQuantity++;
    }

    getCartItems(): [ProductModel, number][] {
        return Array.from(this.cart);
    }

    clearCart() {
        this.cart.clear();
        this.totalQuantity = 0;
    }
}
