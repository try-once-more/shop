import { Component, Input, OnInit } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { Location, NgClass, NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Category } from "../../enums/category.enum";
import { Router } from "@angular/router";
import { CanComponentDeactivate } from "src/app/core/interfaces/can-component-deactivate.interface";
import { Observable, of } from "rxjs";
import * as ProductsActions from "../../../@ngrx/products/products.actions";
import { Store } from "@ngrx/store";
import * as RouterActions from "../../../@ngrx/router/router.actions";

@Component({
    selector: "app-product-view",
    standalone: true,
    templateUrl: "./product-view.component.html",
    imports: [NgClass, FormsModule, NgFor, NgIf]
})
export class ProductViewComponent implements OnInit, CanComponentDeactivate {
    @Input({ required: true }) product: ProductModel | undefined;

    private goBackClicked = false;
    private readonly emptyProduct: Partial<ProductModel> = {
        isAvailable: false,
        price: 0,
        name: "",
        description: "",
    };
    
    editedProduct: Partial<ProductModel> = { ...this.emptyProduct };
    readonly categories: string[] = Object.values(Category);
    readonly viewOnly: boolean;

    
    constructor(private readonly router: Router,
        private readonly store: Store) {

        this.viewOnly = !this.router.routerState.snapshot.url.includes("/admin/");
    }

    ngOnInit() {
        if (this.product) {
            this.editedProduct = { ...this.product };
        }
    }

    saveProduct() {
        if (!this.viewOnly) {
            if (this.editedProduct.id) {
                this.store.dispatch(ProductsActions.updateProduct({ product: this.editedProduct as ProductModel }));
            } else {
                this.store.dispatch(ProductsActions.createProduct({ product: this.editedProduct as ProductModel }));
            }

            this.goBackClicked = true;
        }
    }

    goBack() {
        this.goBackClicked = true;
        this.store.dispatch(RouterActions.back());
    }

    canDeactivate(): boolean | Observable<boolean> {
        if (this.goBackClicked) {
            return true;
        }

        const sourceModel = this.product ?? this.emptyProduct;
        const hasChanged = (Object.keys(this.editedProduct) as (keyof ProductModel)[])
            .every(key => sourceModel[key] === this.editedProduct[key]);

        return hasChanged || of(window.confirm("Discard changes?"));
    }
}
