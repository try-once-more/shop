import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { Constants, ConstantsServiceToken } from "./core/services/constant.service";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CartIconComponent } from "./cart/components/cart-icon/cart-icon.component";
import { AuthService } from "./core/services/auth.service";
import { NgFor, NgIf } from "@angular/common";
import { RoleModel } from "./core/models/role-model";
import { Subscription } from "rxjs";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: "./app.component.html",
    imports: [ProductListComponent, RouterLink, RouterOutlet, CartIconComponent, NgFor, NgIf]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

    private sub: Subscription | undefined;
    private title: string = "";
    @ViewChild("appTitle", { static: true }) appTitle!: ElementRef<HTMLHeadingElement>;

    constructor(@Inject(ConstantsServiceToken) private constants: Constants,
        readonly authService: AuthService) {
    }

    ngOnInit(): void {
        this.title = `${this.constants.App} v${this.constants.Version}`;
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }

    ngAfterViewInit() {
        this.appTitle.nativeElement.textContent = this.title;
    }

    logIn(role: RoleModel) {
        this.unsubscribe();
        this.sub = this.authService.login(role).subscribe();
    }

    logOut() {
        this.authService.logout();
    }

    private unsubscribe() {
        this.sub?.unsubscribe();
        this.sub = undefined;
    }
}
