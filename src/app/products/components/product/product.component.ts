import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.css"],
    imports: [CommonModule]
})
export class ProductComponent {
    @Input({ required: true }) product!: ProductModel;
    @Output() addToCart = new EventEmitter<ProductModel>();

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}