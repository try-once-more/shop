import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { ConstantsServiceToken } from "./app/core/services/constant.service";

const constants = {
    App: "Shop",
    Version: require("../package.json").version,
    API_URL: "http://localhost:4200",
};

bootstrapApplication(AppComponent, {
    providers: [
        { provide: ConstantsServiceToken, useValue: constants }
    ]
}).catch(err => console.error(err));
