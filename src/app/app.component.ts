import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { ProductListComponent } from "./products/components/product-list/product-list.component";
import { Constants, ConstantsServiceToken } from "./core/services/constant.service";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./core/components/header/header.component";

@Component({
    selector: "app-root",
    standalone: true,
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    imports: [HeaderComponent, ProductListComponent, RouterModule]
})
export class AppComponent implements OnInit, AfterViewInit {

    private title: string = "";
    @ViewChild("appTitle", { static: true }) appTitle!: ElementRef<HTMLHeadingElement>;

    constructor(@Inject(ConstantsServiceToken) private constants: Constants) {
    }

    ngOnInit(): void {
        this.title = `${this.constants.App} v${this.constants.Version}`;
    }

    ngAfterViewInit() {
        this.appTitle.nativeElement.textContent = this.title;
    }
}
