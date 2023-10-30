import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { ConstantsServiceToken } from "./core/services/constant.service";
import { AuthService } from "./core/services/auth.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { RoleModel } from "./core/models/role-model";
import { RouterTestingModule } from "@angular/router/testing";
import { CartIconComponent } from "./cart/components/cart-icon/cart-icon.component";
import { CartObservableService } from "./cart/services/cart-observable.service";
import { CartService } from "./cart/services/cart.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { Component } from "@angular/core";
@Component({
    template: "",
})
export class EmptyComponent { }

describe("AppComponent", () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let authService: jasmine.SpyObj<AuthService>;

    beforeEach(waitForAsync(() => {
        authService = jasmine.createSpyObj("AuthService", ["login", "logout"]);

        TestBed.configureTestingModule({
            imports: [AppComponent, CartIconComponent, HttpClientTestingModule,
                RouterTestingModule.withRoutes([{ path: "admin", component: EmptyComponent }])
            ],
            providers: [
                { provide: ConstantsServiceToken, useValue: { App: "MyApp", Version: "1.0" } },
                CartService,
                CartObservableService,
                { provide: AuthService, useValue: authService },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it("should create the app", () => {
        expect(component).toBeTruthy();
    });

    it("should set the title on ngOnInit", () => {
        component.ngOnInit();
        expect(component["title"]).toBe("MyApp v1.0");
    });

    it("should have a Products link", () => {
        const productsLink = fixture.nativeElement.querySelector('[routerLink="/products-list"]');
        expect(productsLink).toBeTruthy();
    });

    it("should log in and navigate to admin if the role is admin", () => {
        const router = TestBed.inject(Router);
        spyOn(router, "navigateByUrl");
        const role: RoleModel = { name: "Admin", isAdmin: true };
        authService.login.and.returnValue(of(role));

        component.logIn(role);

        expect(authService.login).toHaveBeenCalledOnceWith(role);
        expect(router.navigateByUrl).toHaveBeenCalledOnceWith("admin");
    });

    it("should log out", () => {
        component.logOut();

        expect(authService.logout).toHaveBeenCalledTimes(1);
    });

    it("should unsubscribe on ngOnDestroy", () => {
        spyOn(component as any, "unsubscribe");
        component.ngOnDestroy();
        expect(component["unsubscribe"]).toHaveBeenCalled();
    });
});