import { Inject, Injectable, Optional } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { Category } from "../enums/category.enum";
import { GeneratorService } from "src/app/shared/services/generator.service";
import { MathHelper } from "src/app/shared/math.helper";
import { GeneratedStringToken } from "src/app/core/services/generated-string.token";
import { LocalStorageService } from "src/app/core/services/local-storage.service";

@Injectable({
    providedIn: "root"
})
export class ProductsService {
    private readonly ALL_PRODUCTS_KEY = "ALL_PRODUCTS";
    private readonly products: ProductModel[];

    constructor(private readonly generatorService: GeneratorService,
        @Inject(GeneratedStringToken) private generatedString: (n: number) => string,
        @Optional() private localStorageService: LocalStorageService) {
        
        
        const data = this.localStorageService?.getItem(this.ALL_PRODUCTS_KEY);
        if (data) {
            this.products = JSON.parse(data);
        } else {
            this.products = this.generatorService.generateArray(100, (i) => this.generateRandomProduct(i));
            localStorageService?.setItem(this.ALL_PRODUCTS_KEY, JSON.stringify(this.products))
        }
    }

    getProducts(): ProductModel[] {
        return this.products;
    }

    getRandomProduct(): ProductModel {
        return this.products[this.generatorService.random(this.products.length)];
    }

    private generateRandomProduct(_: number): ProductModel {
        const categoryValues = Object.values(Category);
        const id = this.generatorService.getNewID()!;
        return {
            id: id,
            name: `Product[id:${id}]`,
            description: this.generatedString(Math.floor(Math.random() * 100)),
            price: MathHelper.round(Math.random() * 100),
            category: categoryValues[this.generatorService.random(categoryValues.length)] as Category,
            isAvailable: Math.random() > 0.3
        };
    }
}