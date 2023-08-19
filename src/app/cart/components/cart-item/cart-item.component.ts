
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProductModel } from "src/app/products/models/product.model";

@Component({
    standalone: true,
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.css"],
    imports: [FormsModule]
})
export class CartItemComponent {
    @Input({ required: true }) product!: ProductModel;
    @Input({ required: true }) quantity!: number;
    @Input() maxQuantity: number = 999;
    @Input() minQuantity: number = 1;
    @Input() step: number = 1;

    @Output() remove = new EventEmitter<ProductModel>();
}
