import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { CartListComponent } from "./cart/components/cart-list/cart-list.component";
import { ProductListComponent } from "./products/components/product-list/product-list.component";

@Component({
    standalone: true,
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    imports: [CartListComponent, ProductListComponent]
})
export class AppComponent implements AfterViewInit {
    private title = "shop";
    @ViewChild("appTitle", { static: true }) appTitle!: ElementRef<HTMLHeadingElement>;

    ngAfterViewInit() {
        this.appTitle.nativeElement.textContent = this.title;
    }
}
