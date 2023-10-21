import { Inject, Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { Category } from "../enums/category.enum";
import { GeneratorService } from "src/app/shared/services/generator.service";
import { MathHelper } from "src/app/shared/math.helper";
import { GeneratedStringToken } from "src/app/core/services/generated-string.token";
import { Observable, from, map } from "rxjs";
import { ProductsPromiseService } from "./products-promise.service";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    constructor(private readonly generatorService: GeneratorService,
        @Inject(GeneratedStringToken) private generatedString: (n: number) => string,
        private readonly productsPromiseService: ProductsPromiseService) {
    }

    getProducts(): Observable<ProductModel[]> {
        return from(this.productsPromiseService.getProducts());
    }

    getRandomProduct(): Observable<ProductModel> {
        return from(this.productsPromiseService.getProducts()).pipe(
            map(items => items[this.generatorService.random(items.length)])
        );
    }

    updateProduct(model: ProductModel): Observable<ProductModel> {
        return from(this.productsPromiseService.updateProduct(model));
    }

    createProduct(model: ProductModel): Observable<ProductModel> {
        return from(this.productsPromiseService.createProduct(model));
    }

    deleteProduct(model: ProductModel): Observable<unknown> {
        return from(this.productsPromiseService.deleteProduct(model));
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