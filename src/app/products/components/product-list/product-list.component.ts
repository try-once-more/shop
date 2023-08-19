import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { ProductModel } from "../../models/product.model";
import { CartService } from "src/app/cart/services/cart.service";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "../product/product.component";

@Component({
    standalone: true,
    selector: "app-product-list",
    templateUrl: "./product-list.component.html",
    styleUrls: ["./product-list.component.css"],
    imports: [CommonModule, ProductComponent]
})
export class ProductListComponent implements OnInit {
    productList!: ProductModel[];

    constructor(private readonly productsService: ProductsService,
        private readonly cartService: CartService) { }

    ngOnInit(): void {
        this.productList = this.productsService.getProducts();
    }

    onAddToCart(product: ProductModel): void {
        this.cartService.addToCart(product);
    }
}
