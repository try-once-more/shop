import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service";
import { ProductModel } from "../models/product.model";
import { GeneratorService } from "src/app/shared/services/generator.service";
import { ProductsPromiseService } from "./products-promise.service";
import { Category } from "../enums/category.enum";
import { GeneratedStringToken } from "src/app/core/services/generated-string.token";

const fakeProducts: ProductModel[] = [{
    "id": 1,
    "name": "Product[id:1]",
    "description": "zz0jdZ69KbkfUWgrBUIDUKTEEcCwXmYBCwHwkf",
    "price": 87.92,
    "category": Category.Clothing,
    "isAvailable": false
},
{
    "id": 2,
    "name": "Product[id:2]",
    "description": "UFq9PhFlbTH57",
    "price": 5.28,
    "category": Category.Electronics,
    "isAvailable": true
},
{
    "id": 3,
    "name": "Product[id:3]",
    "description": "1qWRGxqUF9spqbSAyBHSPvVxNotHJOB8RMpAdRIYu03hp6Jgd80bwTv2nso5Fk4oIHp0AeWjdPCdMIf9Dp58S3t4lOnCO",
    "price": 84.89,
    "category": Category.Food,
    "isAvailable": true
}];

describe("ProductsService", () => {
    let randomProductIndex: number;
    let productsService: ProductsService;
    let generatorServiceSpy: jasmine.SpyObj<GeneratorService>;
    let productsPromiseServiceSpy: jasmine.SpyObj<ProductsPromiseService>;

    beforeEach(() => {
        randomProductIndex = Math.floor(Math.random() * fakeProducts.length);

        generatorServiceSpy = jasmine.createSpyObj<GeneratorService>({ "random": randomProductIndex });
        productsPromiseServiceSpy = jasmine.createSpyObj<ProductsPromiseService>(
            ["getProducts", "getProduct", "createProduct", "updateProduct", "deleteProduct"]
        );
        productsPromiseServiceSpy.getProducts.and.resolveTo(fakeProducts);
        productsPromiseServiceSpy.getProduct.and.callFake(id => Promise.resolve(fakeProducts[id]));
        productsPromiseServiceSpy.createProduct.and.callFake(model => Promise.resolve(model));
        productsPromiseServiceSpy.updateProduct.and.callFake(model => Promise.resolve(model));
        productsPromiseServiceSpy.deleteProduct.and.callFake(_ => Promise.resolve(undefined));

        TestBed.configureTestingModule({
            providers: [
                ProductsService,
                { provide: GeneratorService, useValue: generatorServiceSpy },
                { provide: ProductsPromiseService, useValue: productsPromiseServiceSpy },
                { provide: GeneratedStringToken, useValue: jasmine.createSpy("") },
            ]
        }).compileComponents();

        productsService = TestBed.inject(ProductsService);
    });

    it("should be created", () => {
        expect(productsService).toBeTruthy();
    });

    it("getProducts should return an Observable of ProductModel[]", done => {
        productsService.getProducts().subscribe(result => {
            expect(productsPromiseServiceSpy.getProducts).toHaveBeenCalledTimes(1);
            expect(result).toEqual(fakeProducts);
            done();
        });
    });

    it("getRandomProduct should return an Observable of a random ProductModel", done => {
        productsService.getRandomProduct().subscribe(result => {
            expect(productsPromiseServiceSpy.getProducts).toHaveBeenCalledTimes(1);
            expect(generatorServiceSpy.random).toHaveBeenCalledOnceWith(fakeProducts.length);
            expect(result).toEqual(fakeProducts[randomProductIndex]);
            done();
        });
    });

    it("updateProduct should return an Observable of updated ProductModel", done => {
        const productToUpdate = fakeProducts[randomProductIndex];

        productsService.updateProduct(productToUpdate).subscribe(result => {
            expect(productsPromiseServiceSpy.updateProduct).toHaveBeenCalledOnceWith(productToUpdate);
            expect(result).toEqual(productToUpdate);
            done();
        });
    });

    it("createProduct should return an Observable of created ProductModel", done => {
        const newProduct = fakeProducts[randomProductIndex];

        productsService.createProduct(newProduct).subscribe(result => {
            expect(productsPromiseServiceSpy.createProduct).toHaveBeenCalledOnceWith(newProduct);
            expect(result).toEqual(newProduct);
            done();
        });
    });

    it("deleteProduct should return an Observable of unknown", done => {
        const productToDelete = fakeProducts[randomProductIndex];

        productsService.deleteProduct(productToDelete).subscribe(result => {
            expect(productsPromiseServiceSpy.deleteProduct).toHaveBeenCalledOnceWith(productToDelete);
            expect(result).toBeUndefined();
            done();
        });
    });
});
