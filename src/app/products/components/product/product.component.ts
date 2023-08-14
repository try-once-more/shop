import { Component, Input } from '@angular/core';
import { ProductModel } from "../../models/product.model";
import { CartService } from "src/app/cart/services/cart.service";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {
    @Input({ required: true }) product!: ProductModel;

    // Лучше сформировать аутпут
    constructor(private readonly cartService: CartService) {
    }

    onAddToCart() {
        if (this.product.isAvailable) {
            this.cartService.addToCart(this.product);
        }
    }
}
