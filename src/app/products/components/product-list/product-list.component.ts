import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductModel } from "../../models/product.model";
import { CartService } from "src/app/cart/services/cart.service";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";
import { Observable, take } from "rxjs";

@Component({
    selector: "app-product-list",
    standalone: true,
    templateUrl: "./product-list.component.html",
    imports: [CommonModule, ProductComponent]
})
export class ProductListComponent implements OnInit {
    products$!: Observable<ProductModel[]>;

    constructor(private readonly productsService: ProductsService,
        private readonly cartService: CartService) { }

    ngOnInit(): void {
        this.products$ = this.productsService.getProducts();
    }

    onAddToCart(product: ProductModel) {
        this.cartService.addProduct(product).pipe(
            take(1)
        ).subscribe();
    }
}
