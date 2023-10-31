import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ProductComponent } from "./product.component";
import { ProductModel } from "../../models/product.model";
import { RouterTestingModule } from "@angular/router/testing";
import { Category } from "../../enums/category.enum";
import { Router, RouterLink } from "@angular/router";
import { By } from "@angular/platform-browser";

describe("ProductComponent", () => {
    let fixture: ComponentFixture<ProductComponent>;
    let component: ProductComponent;
    const product: ProductModel = {
        id: 1,
        name: "Test Product",
        description: "Test Description",
        price: 9.99,
        category: Category.Clothing,
        isAvailable: true,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ProductComponent, RouterTestingModule]
        });

        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        component.product = product;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display product details in the template", () => {
        const compiled = fixture.nativeElement;

        expect(compiled.querySelector(".card-title").textContent).toBe(" $9.99 | TEST PRODUCT | Clothing ");
        expect(compiled.querySelector(".card-subtitle").textContent).toContain("Test Description");
    });

    it("Buy button should be displayed", () => {
        const buyButton = fixture.debugElement.query(By.css("button.btn-outline-primary"));
        expect(buyButton).toBeDefined();
    });

    it("should emit addToCart event on Buy button click", () => {
        const addToCartSpy = spyOn(component.addToCart, "emit");
        const buyButton = fixture.debugElement.query(By.css("button.btn-outline-primary"));

        buyButton.triggerEventHandler("click");

        expect(addToCartSpy).toHaveBeenCalledOnceWith(product);
    });

    it("View button should be displayed", () => {
        const viewButton = fixture.debugElement.query(By.css("button i.bi.bi-eye")).parent;
        expect(viewButton).toBeDefined();
    });

    it("should navigate to product page when View button is clicked", () => {
        const viewButton = fixture.debugElement.query(By.css("button i.bi.bi-eye")).parent;
        const routerLinkInstance = viewButton!.injector.get(RouterLink);
        
        expect(routerLinkInstance["commands"]).toEqual(["/product", product.id]);
    });

    describe("if the user is not an admin", () => {
        it("Edit button shouldn't be displayed", () => {
            const editButton = fixture.debugElement.query(By.css("button i.bi.bi-pencil"));
            expect(editButton).toBeNull();
        });

        it("Delete button shouldn't be displayed", () => {
            const deleteButton = fixture.debugElement.query(By.css("button i.bi.bi-trash"));
            expect(deleteButton).toBeNull();
        });
    });

    describe("if the user is an admin", () => {
        beforeEach(() => {
            const router = TestBed.inject(Router);
            router.routerState.snapshot.url = "/admin/";

            fixture = TestBed.createComponent(ProductComponent);
            component = fixture.componentInstance;
            component.product = product;
            fixture.detectChanges();
        });

        it("the Edit button should be displayed", () => {
            const editButton = fixture.debugElement.query(By.css("button i.bi.bi-pencil")).parent;
            expect(editButton).toBeDefined();
        });

        it("the Delete button should be displayed", () => {
            const deleteButton = fixture.debugElement.query(By.css("button i.bi.bi-trash")).parent;
            expect(deleteButton).toBeDefined();
        });

        it("should emit delete event on Delete button click is user is admin", () => {
            const deleteSpy = spyOn(component.delete, "emit");
            const deleteButton = fixture.debugElement.query(By.css("button i.bi.bi-trash")).parent;

            deleteButton!.triggerEventHandler("click");

            expect(deleteSpy).toHaveBeenCalledWith(product);
        });

        it("should navigate to edit page when Edit button is clicked", () => {
            const editButton = fixture.debugElement.query(By.css("button i.bi.bi-pencil")).parent;
            const routerLinkInstance = editButton!.injector.get(RouterLink);
            
            expect(routerLinkInstance["commands"]).toEqual(["/admin/product/edit", product.id]);
        });
    });
});