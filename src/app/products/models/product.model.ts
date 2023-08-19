import { Category } from "../enums/category.enum";

export interface ProductModel {
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
}
