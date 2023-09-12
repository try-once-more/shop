import { InjectionToken } from "@angular/core";

export interface Constants {
    App: string;
    Version: string;
    API_URL: string;
}

export const ConstantsServiceToken = new InjectionToken<Constants>("ConstantsService");