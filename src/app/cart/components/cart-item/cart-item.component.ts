
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductModel } from "src/app/products/models/product.model";
import { HighlightDirective } from "src/app/shared/directives/highlight.directive";

@Component({
    standalone: true,
    selector: "app-cart-item",
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.css"],
    imports:[HighlightDirective]
})
export class CartItemComponent {
    @Input({ required: true }) product!: ProductModel;
    @Input({ required: true }) quantity!: number;
    @Input() maxQuantity: number = 999;
    @Input() minQuantity: number = 1;
    @Input() step: number = 1;

    @Output() remove = new EventEmitter<ProductModel>();
    @Output() quantityChange = new EventEmitter<number>();

    changeQuantity(newQuantity: number, inputElement: EventTarget | null = null): void {
        if (!isNaN(newQuantity) && newQuantity >= this.minQuantity && newQuantity <= this.maxQuantity) {
            this.quantityChange.emit(newQuantity);
        }
        else if (inputElement instanceof HTMLInputElement) {
            if (isNaN(newQuantity) || newQuantity < this.minQuantity) {
                inputElement.valueAsNumber = this.minQuantity;
            }
            else {
                inputElement.valueAsNumber = this.maxQuantity;
            }
        }
    }
}
