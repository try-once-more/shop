import { Injectable, signal } from "@angular/core";
import { ProductModel } from "src/app/products/models/product.model";
import { MathHelper } from "src/app/shared/math.helper";
import { CartItemModel } from "../models/cart-item.model";
import { Observable, concatMap, delay, forkJoin, map, of, shareReplay, switchMap, take, tap } from "rxjs";
import { CartObservableService } from "./cart-observable.service";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private readonly _totalQuantity = signal(0);
    private readonly _totalCost = signal(0);
    private readonly _isEmptyCart = signal(true);
    private cartItems: CartItemModel[] | undefined;
    private readonly init$: Observable<ReadonlyArray<CartItemModel>>;

    totalQuantity = this._totalQuantity.asReadonly();
    totalCost = this._totalCost.asReadonly();
    isEmptyCart = this._isEmptyCart.asReadonly();

    constructor(private readonly cartObservableService: CartObservableService) {
        this.init$ = this.initState().pipe(
            take(1),
            shareReplay()
        );
        this.init$.subscribe();
    }

    getProducts(): Observable<ReadonlyArray<CartItemModel>> {
        return this.cartItems ? of(this.cartItems) : this.init$;
    }

    addProduct(product: ProductModel, quantity: number = 1): Observable<ReadonlyArray<CartItemModel>> {
        const newItem: CartItemModel = {
            id: product.id,
            product: product,
            quantity: 1,
            cost: product.price
        };

        const existedCartItem = this.cartItems?.find(x => x.product.id === product.id);
        return existedCartItem
            ? this.increaseQuantity(existedCartItem, quantity)
            : this.cartObservableService.createCartItem(newItem).pipe(
                switchMap(addedItem => {
                    this.cartItems = [...this.cartItems ?? [], addedItem];
                    this.updateState(addedItem.quantity, addedItem.cost);
                    return of(this.cartItems);
                })
            );
    }

    removeCartItem(item: CartItemModel): Observable<ReadonlyArray<CartItemModel>> {
        return this.cartObservableService.deleteCartItem(item.id).pipe(
            switchMap(_ => {
                this.cartItems = this.cartItems?.filter(x => x.id !== item.id) ?? [];
                this.updateState(-item.quantity, -item.cost);
                return of(this.cartItems);
            })
        );
    }

    removeAllProducts(): Observable<ReadonlyArray<CartItemModel>> {
        return this.getProducts().pipe(
            concatMap(items => forkJoin(
                items.map((item, index) => of(item).pipe(
                    delay(index * 50),
                    switchMap(item => this.cartObservableService.deleteCartItem(item.product.id))
                ))  
            )),
            tap(() => {
                this.cartItems = [];
                this._totalQuantity.set(0);
                this._totalCost.set(0);
                this._isEmptyCart.set(true);
            }),
            map(() => this.cartItems!)
        );
    }

    increaseQuantity(item: CartItemModel, quantity: number): Observable<ReadonlyArray<CartItemModel>> {
        return this.changeQuantity(item, quantity);
    }

    decreaseQuantity(item: CartItemModel, quantity: number): Observable<ReadonlyArray<CartItemModel>> {
        return this.changeQuantity(item, -quantity);
    }

    private changeQuantity(item: CartItemModel, diffQuantity: number): Observable<ReadonlyArray<CartItemModel>> {
        const copy = {
            id: item.product.id,
            product: item.product,
            quantity: item.quantity + diffQuantity,
            cost: MathHelper.round((item.quantity + diffQuantity) * item.product.price)
        };

        return this.cartObservableService.updateCartItem(copy).pipe(
            switchMap(updatedItem => {
                this.cartItems = this.cartItems?.map(x => x.id === updatedItem.id ? { ...updatedItem } : x) ?? [];
                this.updateState(diffQuantity, MathHelper.round(diffQuantity * item.product.price));
                return of(this.cartItems);
            })
        );
    }

    private initState(): Observable<ReadonlyArray<CartItemModel>> {
        return this.cartObservableService.getCartItems().pipe(
            tap(items => {
                let totalQuantity = 0;
                let totalCost = 0;
                items.forEach(x => {
                    totalQuantity += x.quantity;
                    totalCost = MathHelper.round(totalCost + x.quantity * x.cost);
                });
                this._totalQuantity.update(_ => totalQuantity);
                this._totalCost.update(_ => totalCost);
                this._isEmptyCart.set(!items.length);
                this.cartItems = items;
            })
        );
    }

    private updateState(quantityToAdd: number, costToAdd: number): void {
        this._totalQuantity.update(value => value + quantityToAdd);
        this._totalCost.update(value => MathHelper.round(value + costToAdd));
        this._isEmptyCart.set(!this.cartItems?.length);
    }
}