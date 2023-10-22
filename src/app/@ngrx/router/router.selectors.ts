import { createFeatureSelector } from "@ngrx/store";
import type { RouterReducerState } from "@ngrx/router-store";
import type { RouterStateUrl } from "./router.state";

export const routerFeatureKey = "router";
export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(routerFeatureKey);