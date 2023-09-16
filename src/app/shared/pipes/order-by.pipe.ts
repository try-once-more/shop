import { Pipe, PipeTransform } from "@angular/core";
import { DeepKeyOf } from "../deepkeyof.type";
import { SortOption } from "src/app/core/enums/sort-option.enum";

@Pipe({
    name: "orderBy",
    standalone: true
})
export class OrderByPipe implements PipeTransform {
    transform<T>(value: readonly T[] | null, properties: Array<DeepKeyOf<T>>, sortOption: SortOption = SortOption.DESC): readonly T[] | null {
        if (!value) {
            return value;
        }
        const orderByAsc = sortOption === SortOption.ASC;

        const compareFn = (a: T, b: T): -1 | 0 | 1 => {
            for (let key of properties) {
                const aValue = this.get(a, key);
                const bValue = this.get(b, key);

                if (aValue > bValue) return orderByAsc ? 1 : -1;
                if (aValue < bValue) return orderByAsc ? -1 : 1;
            }

            return 0;
        };

        const sortedArray = [...value].sort((a, b) => compareFn(a, b));
        return sortedArray;
    }

    private get<T>(object: T, path: string): any {
        const keys = path.split(".");
        let result: any = object;
        for (const key of keys) {
            if (result == null || typeof result !== "object") {
                return undefined;
            }
            result = result[key];
        }
        return result;
    }
}
