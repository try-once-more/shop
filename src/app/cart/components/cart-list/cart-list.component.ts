import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { ProductModel } from "src/app/products/models/product.model";
import { Category } from "src/app/products/enums/category.enum";
import { ProductsService } from "src/app/products/services/products.service";
import { CommonModule, KeyValue } from "@angular/common";
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
    standalone: true,
    selector: "app-cart-list",
    templateUrl: "./cart-list.component.html",
    styleUrls: ["./cart-list.component.css"],
    imports: [CommonModule, CartItemComponent]
})
export class CartListComponent implements OnInit {

    isCartPopupOpen: boolean = false;
    cartItems!: ReadonlyMap<Category, ReadonlyMap<ProductModel, number>>;

    constructor(public readonly cartService: CartService,
        private readonly productsService: ProductsService) {
    }

    ngOnInit(): void {
        this.cartItems = this.cartService.getCartItems();
    }

    toggleCart(): void {
        this.isCartPopupOpen = !this.isCartPopupOpen;
    }

    buyRandom(): void {
        this.cartService.addToCart(this.productsService.getRandomProduct());
    }

    clearCart(): void {
        this.cartService.clearCart();
        this.isCartPopupOpen = false;
    }

    trackProductByName(_: number, item: KeyValue<ProductModel, number>): string {
        return item.key.name;
    }

    onRemoveItem(product: ProductModel): void {
        this.cartService.removeFromCart(product);
        if (this.cartItems.size === 0) {
            this.isCartPopupOpen = false;
        }
    }
}