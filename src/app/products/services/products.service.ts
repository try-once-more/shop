import { Injectable } from '@angular/core';
import { ProductModel } from "../models/product.model";
import { Category } from "../enums/category.enum";
import { GeneratorService } from "src/app/shared/services/generator.service";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private readonly products: ProductModel[]

    constructor(private readonly generatorService: GeneratorService) {
        this.products = this.generatorService.generateArray(100, (i) => this.generateRandomProduct(i));
    }

    getProducts(): ProductModel[] {
        return this.products;
    }

    getRandomProduct(): ProductModel {
        return this.products[this.generatorService.random(this.products.length)];
    }

    private generateRandomProduct(index: number): ProductModel {
        const categoryValues = Object.values(Category);
        return {
            name: `Product_${++index}`,
            description: this.generatorService.generateString(Math.floor(Math.random() * 100)),
            price: parseFloat((Math.random() * 1000).toFixed(2)),
            category: categoryValues[this.generatorService.random(categoryValues.length)] as Category,
            isAvailable: Math.random() > 0.3
        };
    }
}