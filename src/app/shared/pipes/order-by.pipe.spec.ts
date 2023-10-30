import { OrderByPipe } from "./order-by.pipe";
import { SortOption } from "src/app/core/enums/sort-option.enum";

describe("OrderByPipe", () => {
    const inputArray = [
        { id: 3, data: { age: 1, name: "B" } },
        { id: 2, data: { age: 2, name: "A" } },
        { id: 1, data: { age: 1, name: "C" } },
    ];

    const pipe = new OrderByPipe();

    it("should be created", () => {
        expect(pipe).toBeTruthy();
    });

    it("should return sorted array in descending order by data.age and data.name", () => {
        const expected = [
            { id: 2, data: { age: 2, name: "A" } },
            { id: 1, data: { age: 1, name: "C" } },
            { id: 3, data: { age: 1, name: "B" } },
        ];

        const sortedArray = pipe.transform(inputArray, ["data.age", "data.name"]);

        expect(sortedArray).toEqual(expected);
    });

    it("should return sorted array in ascending order by id", () => {
        const expected = [
            { id: 1, data: { age: 1, name: "C" } },
            { id: 2, data: { age: 2, name: "A" } },
            { id: 3, data: { age: 1, name: "B" } },
        ];

        const sortedArray = pipe.transform(inputArray, ["id"], SortOption.ASC);

        expect(sortedArray).toEqual(expected);
    });

    it("should not sort the array in empty props passed", () => {
        const sortedArray = pipe.transform(inputArray, []);

        expect(sortedArray).toEqual(inputArray);
    });

    it("should return null when the input array is null", () => {
        const sortedArray = pipe.transform(null, ["id"]);

        expect(sortedArray).toBeNull();
    });

    it("should return the input array when properties are invalid", () => {
        const inputArray = [{ id: 2, name: "B" }, { id: 1, name: "A" }];

        const sortedArray = pipe.transform(inputArray, ["invalidProperty" as any]);

        expect(sortedArray).toEqual(inputArray);
    });
});
