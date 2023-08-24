import { Pipe, PipeTransform } from "@angular/core";
import { CartItemModel } from "../models/cart-item.model";
import { Category } from "src/app/products/enums/category.enum";

@Pipe({
    standalone: true,
    name: "filterCartItemsByCategory"
})
export class FilterCartItemsByCategoryPipe implements PipeTransform {
    transform(items: readonly CartItemModel[] | null, category: Category): CartItemModel[] | null {
        return items?.filter(x => x.product.category === category) ?? null;
    }
}
