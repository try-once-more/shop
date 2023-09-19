import { Component, OnInit, inject } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductModel } from "../../models/product.model";
import { CartService } from "src/app/cart/services/cart.service";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, tap, take } from "rxjs";

@Component({
    selector: "app-product-list",
    standalone: true,
    templateUrl: "./product-list.component.html",
    imports: [CommonModule, ProductComponent]
})
export class ProductListComponent implements OnInit {
    products$: Observable<ProductModel[]> | undefined;
    loading: boolean = true;
    private readonly cartService = inject(CartService);
    private readonly productsService = inject(ProductsService);

    ngOnInit(): void {
        this.products$ = this.productsService.getProducts().pipe(
            take(1),
            tap(() => this.loading = false)
        );
    }

    onAddToCart(product: ProductModel) {
        this.cartService.addProduct(product).pipe(
            take(1)
        ).subscribe();
    }
}
