import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from "../interfaces/can-component-deactivate.interface";

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
    return component.canDeactivate?.() ?? true;
};