import { Component, DestroyRef, OnInit, inject } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CartItemModel } from "../../models/cart-item.model";
import { FilterCartItemsByCategoryPipe } from "../../pipes/filter-cart-items-by-category.pipe";
import { Observable, mergeMap, take, tap } from "rxjs";
import { OrderByPipe } from "src/app/shared/pipes/order-by.pipe";
import { DeepKeyOf } from "src/app/shared/deepkeyof.type";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/products/services/products.service";
import { AppSettingsService } from "src/app/core/services/app-settings.service";
import { SortOption } from "src/app/core/enums/sort-option.enum";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-cart-list",
    standalone: true,
    templateUrl: "./cart-list.component.html",
    imports: [CommonModule, CartItemComponent, FilterCartItemsByCategoryPipe, OrderByPipe, FormsModule]
})
export class CartListComponent implements OnInit {
    private readonly productsService = inject(ProductsService);
    readonly cartService = inject(CartService);

    cartItems$: Observable<readonly CartItemModel[]> | undefined;

    readonly quantityMapping: { [key: string]: string } = { "=1": "# pc.", other: "# pcs." };
    readonly sortOptions = [SortOption.ASC, SortOption.DESC];
    readonly orderByProps: Array<DeepKeyOf<CartItemModel>> = ["cost", "quantity", "product.name"];
    currentSortOrder: SortOption = SortOption.ASC;

    constructor(private readonly router: Router,
        private readonly appSettingsService: AppSettingsService,
        private readonly destroyRef: DestroyRef) {
        this.appSettingsService.appSettings$.pipe(
            take(1),
            tap(settings => this.currentSortOrder = settings.sortOrder),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe();
    }

    ngOnInit(): void {
        this.cartItems$ = this.cartService.getProducts();
    }

    trackProductByName(_: number, item: CartItemModel): string {
        return item.product.name;
    }

    onRemoveItem(item: CartItemModel): void {
        this.cartItems$ = this.cartService.removeCartItem(item);
    }

    onQuantityChange(cartItem: CartItemModel, newQuantity: number): void {
        if (newQuantity > cartItem.quantity) {
            this.cartItems$ = this.cartService.increaseQuantity(cartItem, newQuantity - cartItem.quantity);
        } else if (newQuantity < cartItem.quantity) {
            this.cartItems$ = this.cartService.decreaseQuantity(cartItem, cartItem.quantity - newQuantity);
        }
    }

    onSortOptionChange(value: SortOption): void {
        this.currentSortOrder = value;
        this.appSettingsService.updateSettings("sortOrder", value);
    }

    clearCart(): void {
        this.cartItems$ = this.cartService.removeAllProducts();
    }

    goToOrder(): void {
        this.router.navigateByUrl("cart/order");
    }

    buyRandom(): void {
        this.cartItems$ = this.productsService.getRandomProduct().pipe(
            mergeMap(item => this.cartService.addProduct(item))
        );
    }
}