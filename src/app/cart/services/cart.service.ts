import { Injectable, Optional, signal } from "@angular/core";
import { ProductModel } from "src/app/products/models/product.model";
import { MathHelper } from "src/app/shared/math.helper";
import { CartItemModel } from "../models/cart-item.model";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalStorageService } from "src/app/core/services/local-storage.service";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private readonly ADDED_TO_CART_KEY = "ADDED_TO_CART";
    private readonly _cartProducts: BehaviorSubject<ReadonlyArray<CartItemModel>>;
    private readonly _totalQuantity = signal(0);
    private readonly _totalCost = signal(0);
    private readonly _isEmptyCart = signal(true);
    
    totalQuantity = this._totalQuantity.asReadonly();
    totalCost = this._totalCost.asReadonly();
    isEmptyCart = this._isEmptyCart.asReadonly();

    constructor(@Optional() private localStorageService: LocalStorageService) {
        
        const addedToCart = this.initCart();
        this._cartProducts = new BehaviorSubject(addedToCart);
     }

    getProducts(): Observable<ReadonlyArray<CartItemModel>> {
        return this._cartProducts.asObservable();
    }

    addProduct(product: ProductModel, quantity: number = 1): void {
        if (quantity <= 0) {
            return;
        }

        const itemToAdd = this._cartProducts.getValue().find(x => x.product === product);
        if (!itemToAdd) {
            const cost = MathHelper.round(quantity * product.price);
            this._cartProducts.next(this._cartProducts.getValue().concat({ product: product, quantity: quantity, cost: cost }));
            this.updateState(quantity, cost);
            this.saveCartState();
        } else {
            this.increaseQuantity(product, quantity);
        }
    }

    removeProduct(product: ProductModel): void {
        const itemToRemove = this._cartProducts.getValue().find(x => x.product === product);
        if (itemToRemove) {
            this._cartProducts.next(this._cartProducts.getValue().filter(x => x.product !== product));
            this.updateState(-itemToRemove.quantity, -itemToRemove.cost);
        }

        this.saveCartState();
    }

    removeAllProducts(): void {
        this._cartProducts.next([]);
        this.updateState(-this.totalQuantity(), -this.totalCost());

        this.saveCartState();
    }

    increaseQuantity(product: ProductModel, quantity: number): void {
        this.changeQuantity(product, quantity);
        this.saveCartState();
    }

    decreaseQuantity(product: ProductModel, quantity: number): void {
        this.changeQuantity(product, -quantity);
        this.saveCartState();
    }

    private changeQuantity(product: ProductModel, diffQuantity: number): void {
        this._cartProducts.next(this._cartProducts.getValue().map(item =>
            item.product === product
                ? {
                    product: product,
                    quantity: item.quantity + diffQuantity,
                    cost: MathHelper.round((item.quantity + diffQuantity) * product.price)
                } : item
        ));
        this.updateState(diffQuantity, diffQuantity * product.price);
    }

    private updateState(quantityToAdd: number, costToAdd: number): void {
        this._totalQuantity.update(value => value + quantityToAdd);
        this._totalCost.update(value => MathHelper.round(value + costToAdd));
        this._isEmptyCart.set(!this._cartProducts.getValue().length);
    }

    private saveCartState() {
        this.localStorageService?.setItem(this.ADDED_TO_CART_KEY, JSON.stringify(this._cartProducts.getValue()))
    }

    private initCart(): ReadonlyArray<CartItemModel> {
        const data = this.localStorageService?.getItem(this.ADDED_TO_CART_KEY);
        if (!data) {
            return [];
        }
        const addedToCart: CartItemModel[] = JSON.parse(data);

        let totalQuantity = 0;
        let totalCost = 0;
        addedToCart.forEach(x => {
            totalQuantity += x.quantity;
            totalCost = MathHelper.round(totalCost + x.quantity * x.cost);
        });
        this._totalQuantity.update(_ => totalQuantity);
        this._totalCost.update(_ => totalCost);
        this._isEmptyCart.set(!addedToCart.length);

        return addedToCart;
    }
}