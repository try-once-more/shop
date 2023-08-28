
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ProductModel } from "src/app/products/models/product.model";
import { HighlightDirective } from "src/app/shared/directives/highlight.directive";

@Component({
    selector: "app-cart-item",
    standalone: true,
    templateUrl: "./cart-item.component.html",
    styleUrls: ["./cart-item.component.css"],
    imports: [HighlightDirective]
})
export class CartItemComponent {
    @Input({ required: true }) product!: ProductModel;
    @Input({ required: true }) quantity!: number;
    @Input() maxQuantity: number = 999;
    @Input() minQuantity: number = 1;
    @Input() step: number = 1;

    @Output() remove = new EventEmitter<ProductModel>();
    @Output() quantityChange = new EventEmitter<number>();

    @ViewChild("input") inputElement!: ElementRef<HTMLInputElement>;

    changeQuantity(value: number): void {
        if (value > this.maxQuantity) {
            value = this.maxQuantity;
        } else if (value < this.minQuantity) {
            value = this.minQuantity;
        }

        if (isNaN(value) || this.quantity === value) {
            this.inputElement.nativeElement.valueAsNumber = this.quantity;
            return;
        }

        this.quantityChange.emit(value);
    }
}
