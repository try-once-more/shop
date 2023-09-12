import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { ChangeStyleDirective } from "src/app/shared/directives/change-style.directive";

@Component({
    selector: "app-product",
    standalone: true,
    templateUrl: "./product.component.html",
    imports: [CommonModule, ChangeStyleDirective]
})
export class ProductComponent {
    @Input({ required: true }) product!: ProductModel;
    @Output() addToCart = new EventEmitter<ProductModel>();

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }
}