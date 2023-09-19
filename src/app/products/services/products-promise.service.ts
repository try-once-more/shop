import { Inject, Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { firstValueFrom, retry } from "rxjs";
import { API_URL } from "src/app/core/services/api-url.token";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ProductsPromiseService {
    private readonly attempts = 2;
    private readonly url: string;

    constructor(@Inject(API_URL) private readonly apiUrl: string,
        private readonly httpClient: HttpClient) {
        this.url = `${this.apiUrl}/products`;
    }

    getProducts(): Promise<ProductModel[]> {
        const request$ = this.httpClient.get<ProductModel[]>(this.url).pipe(
            retry(this.attempts)
        );
        return firstValueFrom(request$);
    }

    getProduct(id: NonNullable<ProductModel["id"]>): Promise<ProductModel> {
        const url = `${this.url}/${id}`;
        const request$ = this.httpClient.get<ProductModel>(url).pipe(
            retry(this.attempts)
        );
        return firstValueFrom(request$);
    }

    createProduct(item: ProductModel): Promise<ProductModel> {
        const request$ = this.httpClient.post<ProductModel>(this.url, item).pipe(
            retry(this.attempts)
        );
        return firstValueFrom(request$);
    }

    updateProduct(item: ProductModel): Promise<ProductModel> {
        const url = `${this.url}/${item.id}`;
        const request$ = this.httpClient.put<ProductModel>(url, item).pipe(
            retry(this.attempts)
        );
        return firstValueFrom(request$);
    }

    deleteProduct(item: ProductModel): Promise<unknown> {
        const url = `${this.url}/${item.id}`;
        const request$ = this.httpClient.delete(url).pipe(
            retry(this.attempts)
        );
        return firstValueFrom(request$);
    }
}