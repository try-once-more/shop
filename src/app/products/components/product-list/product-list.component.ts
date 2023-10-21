import { Component, OnInit, inject } from "@angular/core";
import { ProductModel } from "../../models/product.model";
import { CartService } from "src/app/cart/services/cart.service";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, take } from "rxjs";
import { Store } from "@ngrx/store";
import * as ProductsActions from "../../../@ngrx/products/products.actions";
import { selectProductsData, selectProductsError, selectProductsLoading } from "src/app/@ngrx/products/products.selectors";

@Component({
    selector: "app-product-list",
    standalone: true,
    templateUrl: "./product-list.component.html",
    imports: [CommonModule, ProductComponent]
})
export class ProductListComponent implements OnInit {
    private readonly cartService = inject(CartService);
    private readonly store = inject(Store);

    products$!: Observable<ReadonlyArray<ProductModel>>;
    error$!: Observable<Error | string | null>;
    loading$!: Observable<boolean>;

    ngOnInit(): void {
        this.products$ = this.store.select(selectProductsData);
        this.error$ = this.store.select(selectProductsError);
        this.loading$ = this.store.select(selectProductsLoading);

        this.store.dispatch(ProductsActions.getProducts());
    }

    onAddToCart(product: ProductModel) {
        this.cartService.addProduct(product).pipe(
            take(1)
        ).subscribe();
    }

    onDelete(product: ProductModel) {
        this.store.dispatch(ProductsActions.deleteProduct({ product }));
    }    
}
