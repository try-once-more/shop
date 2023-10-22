import { AppComponent } from "./app/app.component";
import { bootstrapApplication } from "@angular/platform-browser";
import { ConstantsServiceToken } from "./app/core/services/constant.service";
import { GeneratedStringToken } from "./app/core/services/generated-string.token";
import { GeneratorFactory } from "./app/core/services/generator.factory";
import { GeneratorService } from "./app/shared/services/generator.service";
import { LocalStorageService } from "./app/core/services/local-storage.service";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { APP_ROUTES } from "./app/app-routing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { httpInterceptorProviders } from "./app/core/interceptors";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { productsFeatureKey } from "./app/@ngrx/app.state";
import { productsReducer } from "./app/@ngrx/products/products.reducer";
import { ProductsEffects } from "./app/@ngrx/products/products.effects";
import { routerReducers } from "./app/@ngrx/router/router.reducer";
import { RouterEffects } from "./app/@ngrx/router/router.effects";
import { RouterState, provideRouterStore } from "@ngrx/router-store";
import { CustomSerializer } from "./app/@ngrx/router/router.custom-serializer";
import { routerFeatureKey } from "./app/@ngrx/router/router.selectors";

const constants = {
    App: "Shop",
    Version: require("../package.json").version,
    API_URL: "http://localhost:4200",
};

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTES, withComponentInputBinding()),
        provideStore(routerReducers),
        provideRouterStore({
            stateKey: routerFeatureKey,
            routerState: RouterState.Minimal,
            serializer: CustomSerializer
        }),
        provideState(productsFeatureKey, productsReducer),
        provideEffects([ProductsEffects, RouterEffects]),
        { provide: ConstantsServiceToken, useValue: constants },
        { provide: GeneratedStringToken, useFactory: GeneratorFactory, deps: [GeneratorService] },
        { provide: LocalStorageService, useValue: new LocalStorageService() },
        { provide: DEFAULT_CURRENCY_CODE, useValue: "USD" },
        { provide: LOCALE_ID, useValue: "en-US" },
        httpInterceptorProviders
    ]
}).catch((error: Error) => console.error(error));
