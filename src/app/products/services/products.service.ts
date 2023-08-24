import { Inject, Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { Category } from "../enums/category.enum";
import { GeneratorService } from "src/app/shared/services/generator.service";
import { MathHelper } from "src/app/shared/math.helper";
import { GeneratedStringToken } from "src/app/core/services/generated-string.token";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    private readonly products: ProductModel[];

    constructor(private readonly generatorService: GeneratorService,
        @Inject(GeneratedStringToken) private generatedString: (n: number) => string) {
        this.products = this.generatorService.generateArray(100, (i) => this.generateRandomProduct(i));
    }

    getProducts(): ProductModel[] {
        return this.products;
    }

    getRandomProduct(): ProductModel {
        return this.products[this.generatorService.random(this.products.length)];
    }

    private generateRandomProduct(_: number): ProductModel {
        const categoryValues = Object.values(Category);
        return {
            name: `Product[id:${this.generatorService.getNewID()}]`,
            description: this.generatedString(Math.floor(Math.random() * 100)),
            price: MathHelper.round(Math.random() * 100),
            category: categoryValues[this.generatorService.random(categoryValues.length)] as Category,
            isAvailable: Math.random() > 0.3
        };
    }
}
