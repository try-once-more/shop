import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from "../../models/product.model";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {
    @Input({ required: true }) product!: ProductModel;
    @Output() addToCart = new EventEmitter<ProductModel>();
    
    onAddToCart() {
        this.addToCart.emit(this.product);
    }
}