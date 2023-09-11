import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FilterCartItemsByCategoryPipe } from "src/app/cart/pipes/filter-cart-items-by-category.pipe";
import { CartService } from "src/app/cart/services/cart.service";
import { ProductsService } from "src/app/products/services/products.service";
import { OrderByPipe } from "src/app/shared/pipes/order-by.pipe";

@Component({
    selector: "app-header",
    standalone: true,
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
    imports: [CommonModule, FilterCartItemsByCategoryPipe, OrderByPipe]
})
export class HeaderComponent {
    isCartPopupOpen: boolean;
    quantityMapping: { [key: string]: string } = { "=1": "# pc.", other: "# pcs." };

    constructor(
        public readonly cartService: CartService,
        private readonly productsService: ProductsService,
        private readonly router: Router) {
        this.isCartPopupOpen = this.router.url === "/cart";
    }

    buyRandom(): void {
        this.cartService.addProduct(this.productsService.getRandomProduct());
    }

    clearCart(): void {
        this.cartService.removeAllProducts();
    }

    toggleCart(): void {
        const currentRoute = this.router.url;

        if (currentRoute === "/cart") {
            this.router.navigateByUrl("/products-list");
        } else {
            this.router.navigateByUrl("/cart");
        }

        this.isCartPopupOpen = !this.isCartPopupOpen;
    }
}
