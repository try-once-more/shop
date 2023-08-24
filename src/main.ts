import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { ConstantsServiceToken } from "./app/core/services/constant.service";
import { GeneratedStringToken } from "./app/core/services/generated-string.token";
import { GeneratorFactory } from "./app/core/services/generator.factory";
import { GeneratorService } from "./app/shared/services/generator.service";
import { LocalStorageService } from "./app/core/services/local-storage.service";

const constants = {
    App: "Shop",
    Version: require("../package.json").version,
    API_URL: "http://localhost:4200",
};

bootstrapApplication(AppComponent, {
    providers: [
        { provide: ConstantsServiceToken, useValue: constants },
        { provide: GeneratedStringToken, useFactory: GeneratorFactory, deps: [GeneratorService]},
        { provide: LocalStorageService, useValue: new LocalStorageService() }
    ]
}).catch((error: Error) => console.error(error));
