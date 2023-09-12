import { Component, inject } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { ProductModel } from "src/app/products/models/product.model";
import { CommonModule } from "@angular/common";
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CartItemModel } from "../../models/cart-item.model";
import { FilterCartItemsByCategoryPipe } from "../../pipes/filter-cart-items-by-category.pipe";
import { map } from "rxjs";
import { OrderByPipe } from "src/app/shared/pipes/order-by.pipe";
import { DeepKeyOf } from "src/app/shared/deepkeyof.type";
import { Router } from "@angular/router";
import { ProductsService } from "src/app/products/services/products.service";

@Component({
    selector: "app-cart-list",
    standalone: true,
    templateUrl: "./cart-list.component.html",
    imports: [CommonModule, CartItemComponent, FilterCartItemsByCategoryPipe, OrderByPipe]
})
export class CartListComponent {
    private readonly productsService = inject(ProductsService);
    readonly cartService = inject(CartService);

    cartItems$ = this.cartService.getProducts();
    categories$ = this.cartItems$.pipe(
        map(cartItems => new Set(cartItems.map(item => item.product.category))));

    quantityMapping: { [key: string]: string } = { "=1": "# pc.", other: "# pcs." };
    sortOptions = [
        { name: 'ASC', value: true },
        { name: 'DESC', value: false },
    ];
    readonly orderByProps: Array<DeepKeyOf<CartItemModel>> = ["cost", "quantity", "product.name"];
    orderByAsc: boolean = false;

    constructor(private readonly router: Router) {
    }

    trackProductByName(_: number, item: CartItemModel): string {
        return item.product.name;
    }

    onRemoveItem(product: ProductModel): void {
        this.cartService.removeProduct(product);
        if (this.cartService.isEmptyCart()) {
            this.router.navigateByUrl("/products-list");
        }
    }

    onQuantityChange(cartItem: CartItemModel, newQuantity: number): void {
        if (newQuantity > cartItem.quantity) {
            this.cartService.increaseQuantity(cartItem.product, newQuantity - cartItem.quantity);
        } else if (newQuantity < cartItem.quantity) {
            this.cartService.decreaseQuantity(cartItem.product, cartItem.quantity - newQuantity);
        }
    }

    onSortOptionChange(value: string): void {
        this.orderByAsc = value === "true";
    }

    clearCart(): void {
        this.cartService.removeAllProducts();
    }

    buyRandom(): void {
        this.cartService.addProduct(this.productsService.getRandomProduct());
    }
}