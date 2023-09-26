import { Component, inject } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { CurrencyPipe, NgIf } from "@angular/common";

@Component({
    selector: 'app-cart-icon',
    standalone: true,
    templateUrl: "./cart-icon.component.html",
    imports: [NgIf, CurrencyPipe]
})
export class CartIconComponent {
    readonly cartService = inject(CartService);
}
