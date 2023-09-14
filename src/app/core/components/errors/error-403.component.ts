import { Component } from "@angular/core";

@Component({
    selector: "app-error-403",
    standalone: true,
    template: `
    <h1>Error 403 - Forbidden</h1>
    <p>Sorry, but you don"t have permission to access this page.</p>
  `
})
export class Error403Component {
}
