import { Injectable } from "@angular/core";
import { ConfigModel } from "../models/config.model";

@Injectable({
    providedIn: "root"
})
export class ConfigOptionService {

    private config: ConfigModel = {
        id: 0,
        login: "",
        email: ""
    };

    setConfig(newConfig: Partial<ConfigModel>): void {
        this.config = { ...this.config, ...newConfig };
    }

    getConfig(): ConfigModel {
        return this.config;
    }

    setConfigProperty<T extends keyof ConfigModel>(key: T, value: ConfigModel[T]): void {
        this.config[key] = value;
    }
}
