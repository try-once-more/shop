import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, retry } from "rxjs";
import { CartItemModel } from "../models/cart-item.model";
import { API_URL } from "src/app/core/services/api-url.token";
import { ProductModel } from "src/app/products/models/product.model";

@Injectable({
    providedIn: "root",
})
export class CartObservableService {
    private readonly retries = 2;
    private readonly url: string;

    constructor(@Inject(API_URL) private readonly apiUrl: string,
        private readonly httpClient: HttpClient) {
        this.url = `${this.apiUrl}/cart`;
    }

    getCartItems(): Observable<CartItemModel[]> {
        return this.httpClient.get<CartItemModel[]>(this.url).pipe(
            retry(this.retries)
        );
    }

    updateCartItem(item: CartItemModel): Observable<CartItemModel> {
        const url = `${this.url}/${item.product.id}`;
        return this.httpClient.put<CartItemModel>(url, item).pipe(
            retry(this.retries)
        );
    }


    createCartItem(item: CartItemModel): Observable<CartItemModel> {
        return this.httpClient.post<CartItemModel>(this.url, item).pipe(
            retry(this.retries)
        );
    }


    deleteCartItem(id: NonNullable<ProductModel["id"]>): Observable<unknown> {
        const url = `${this.url}/${id}`;
        return this.httpClient.delete(url).pipe(
            retry(this.retries)
        );
    }
}
