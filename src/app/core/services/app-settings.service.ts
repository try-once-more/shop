import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, shareReplay, take, tap } from 'rxjs/operators';
import { AppSettingsModel } from '../models/app-settings.model';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { SortOption } from "../enums/sort-option.enum";

@Injectable({
    providedIn: 'root',
})
export class AppSettingsService {
    private readonly APP_SETTINGS_KEY = "APP_SETTINGS_KEY";
    readonly appSettings$: Observable<AppSettingsModel>;

    constructor(@Optional() private readonly localStorageService: LocalStorageService,
        private readonly httpClient: HttpClient) {
        this.appSettings$ = this.loadSettings().pipe(
            take(1),
            shareReplay()
        );
    }

    private loadSettings(): Observable<AppSettingsModel> {
        const appSettings = this.localStorageService?.getItem<AppSettingsModel>(this.APP_SETTINGS_KEY);
        if (appSettings) {
            return of(appSettings);
        }

        return this.httpClient.get<AppSettingsModel>("assets/app-settings.json").pipe(
            retry(2),
            tap(settings => {
                if (!settings.sortOrder) {
                    throw new Error();
                }
                
                this.updateSettings("sortOrder", settings.sortOrder);
            }),
            catchError(() => of(this.getDefault())),
        );
    }

    updateSettings<K extends keyof AppSettingsModel>(key: K, value: AppSettingsModel[K]): void {
        const appSettings: AppSettingsModel = this.localStorageService?.getItem<AppSettingsModel>(this.APP_SETTINGS_KEY) 
            ?? this.getDefault();
        
        appSettings[key] = value;
        this.localStorageService?.setItem<AppSettingsModel>(this.APP_SETTINGS_KEY, appSettings);
    }

    private getDefault(): AppSettingsModel {
        return { 
            sortOrder: SortOption.DESC 
        };
    }
}
