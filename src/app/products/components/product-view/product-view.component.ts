import { Component, Input, OnInit } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { Location, NgClass, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Category } from "../../enums/category.enum";
import { Router } from "@angular/router";

@Component({
    selector: "app-product-view",
    standalone: true,
    templateUrl: "./product-view.component.html",
    imports: [NgClass, FormsModule, NgFor, NgIf]
})
export class ProductViewComponent implements OnInit {
    @Input({ required: true }) product!: ProductModel;
    editedProduct!: ProductModel;
    readonly categories: string[] = Object.values(Category);
    readonly viewOnly: boolean;

    constructor(private readonly router: Router,
        private readonly location: Location) {
        this.viewOnly = !this.router.routerState.snapshot.url.includes("/admin/");
    }

    ngOnInit() {
        this.editedProduct = this.product ? { ...this.product } : {
            isAvailable: false,
            price: 0,
            name: "",
            description: ""
        } as ProductModel;
    }

    saveProduct() {
        if (!this.viewOnly) {
            //TODO: Save changes
        }

        this.goBack();
    }

    cancelEdit() {
        this.goBack();
    }

    private goBack(): void {
        this.location.back();
    }
}
