import { Component } from "@angular/core";

@Component({
    selector: "app-error-404",
    standalone: true,
    template: `
    <h1>Error 404 - Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  `
})
export class Error404Component {
}
