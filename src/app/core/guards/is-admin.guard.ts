import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const isAdminGuard: CanActivateFn =
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const currentRole = inject(AuthService).currentRole();
        if (currentRole?.isAdmin) {
            return true;
        }

        return false;
    };