import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ProductsPromiseService } from "./products-promise.service";
import { API_URL } from "src/app/core/services/api-url.token";
import { ProductModel } from "../models/product.model";
import { Category } from "../enums/category.enum";

describe("ProductsPromiseService", () => {
    const apiUrl = "https://example.com/api";
    const product: ProductModel = {
        id: 1,
        name: "Test Product",
        description: "Test Description",
        price: 9.99,
        category: Category.Food,
        isAvailable: true,
    };

    let service: ProductsPromiseService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProductsPromiseService,
                { provide: API_URL, useValue: apiUrl },
            ],
        });

        service = TestBed.inject(ProductsPromiseService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should retrieve products from the API", done => {
        const expectedProducts: ProductModel[] = [product];

        service.getProducts().then(result => {
            expect(result).toEqual(expectedProducts);
            done();
        });

        httpTestingController.expectOne({
            method: "GET",
            url: `${apiUrl}/products`,
        }).flush(expectedProducts);
    });

    it("should retrieve a product by id from the API", done => {
        const productId = 1;

        service.getProduct(productId).then(result => {
            expect(result).toEqual(product);
            done();
        });

        httpTestingController.expectOne({
            method: "GET",
            url: `${apiUrl}/products/${productId}`,
        }).flush(product);
    });

    it("should create a product via the API", done => {
        service.createProduct(product).then(result => {
            expect(result).toEqual(product);
            done();
        });

        httpTestingController.expectOne({
            method: "POST",
            url: `${apiUrl}/products`,
        }).flush(product);
    });

    it("should update a product via the API", done => {
        service.updateProduct(product).then(result => {
            expect(result).toEqual(product);
            done();
        });

        httpTestingController.expectOne({
            method: "PUT",
            url: `${apiUrl}/products/${product.id}`,
        }).flush(product);
    });

    it("should delete a product via the API", done => {
        service.deleteProduct(product).then(result => {
            expect(result).toBeNull();
            done();
        });

        httpTestingController.expectOne({
            method: "DELETE",
            url: `${apiUrl}/products/${product.id}`,
        }).flush(null);
    });
});