import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { CommonModule } from "@angular/common";
import { ChangeStyleDirective } from "src/app/shared/directives/change-style.directive";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: "app-product",
    standalone: true,
    templateUrl: "./product.component.html",
    imports: [CommonModule, ChangeStyleDirective, RouterLink]
})
export class ProductComponent  {
    @Input({ required: true }) product!: ProductModel;
    @Output() addToCart = new EventEmitter<ProductModel>();
    @Output() delete = new EventEmitter<ProductModel>();

    readonly canEdit: boolean;

    constructor(private readonly router: Router) {
        this.canEdit = this.router.routerState.snapshot.url.includes("/admin/");
    }

    onAddToCart(): void {
        this.addToCart.emit(this.product);
    }

    onDelete(): void {
        this.delete.emit(this.product);
    } 
}