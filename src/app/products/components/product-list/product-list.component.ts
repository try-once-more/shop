import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../services/products.service";
import { ProductModel } from "../../models/product.model";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    productList!: ProductModel[];

    constructor(private readonly productsService: ProductsService) { }

    ngOnInit() {
        this.productList = this.productsService.getProducts();
    }
}
