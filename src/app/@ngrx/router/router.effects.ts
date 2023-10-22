import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import * as RouterActions from "./router.actions";

const effectConfig = {
    dispatch: false
};

@Injectable()
export class RouterEffects {
    private readonly actions$ = inject(Actions);
    private readonly router = inject(Router);
    private readonly location = inject(Location);

    navigate$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.go),
        tap(action => {
            const { path, queryParams, extras } = { ...action };
            this.router.navigate(path, { queryParams, ...extras });
        })
    ), effectConfig);

    navigateBack$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
    ), effectConfig);

    navigateForward$ = createEffect(() => this.actions$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward())
    ), effectConfig);
}