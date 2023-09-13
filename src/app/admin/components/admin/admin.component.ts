import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: "app-admin",
    standalone: true,
    templateUrl: "./admin.component.html",
    imports: [RouterLink, RouterOutlet]
})
export class AdminComponent {
}
