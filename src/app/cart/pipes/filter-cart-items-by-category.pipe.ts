import { Pipe, PipeTransform } from "@angular/core";
import { CartItemModel } from "../models/cart-item.model";
import { Category } from "src/app/products/enums/category.enum";

@Pipe({
    standalone: true,
    name: "filterCartItemsByCategory"
})
export class FilterCartItemsByCategoryPipe implements PipeTransform {
    transform(items: readonly CartItemModel[] | null, category: Category): CartItemModel[] | null {
        // Я рассказывал о том, что лучше возвращать не null, а первоначальный массив
		// В таком случае будет возможность в цепочке применять другие пайпы
		return items?.filter(x => x.product.category === category) ?? null;
    }
}
