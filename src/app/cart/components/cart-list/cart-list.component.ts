import { Component } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { ProductModel } from "src/app/products/models/product.model";
import { Category } from "src/app/products/enums/category.enum";
import { ProductsService } from "src/app/products/services/products.service";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
    standalone: true,
    selector: "app-cart-list",
    templateUrl: "./cart-list.component.html",
    styleUrls: ["./cart-list.component.css"],
    imports: [CommonModule, CartItemComponent]
})
export class CartListComponent {

    isCartPopupOpen: boolean = false;

    constructor(public readonly cartService: CartService,
        private readonly productsService: ProductsService) { }

    toggleCart() {
        this.isCartPopupOpen = !this.isCartPopupOpen;
    }

    buyRandom() {
        this.cartService.addToCart(this.productsService.getRandomProduct());
    }

    clearCart() {
        this.cartService.clearCart();
        this.isCartPopupOpen = false;
    }

    getCategories(): Category[] {
        const cartItems = this.cartService.getCartItems();
        return Object.values(Category).filter(c => cartItems.some(p => p[0].category === c));
    }

    getByCategory(category: Category): [ProductModel, number][] {
        return this.cartService.getCartItems().filter(x => x[0].category === category);
    }

    trackByName(_: number, item: [ProductModel, number]) {
        return item[0].name;
    }

    onRemoveItem(product: ProductModel) {
        this.cartService.removeFromCart(product);
        if (this.cartService.getCartItems().length === 0)
        {
            this.isCartPopupOpen = false;
        }
    }
}