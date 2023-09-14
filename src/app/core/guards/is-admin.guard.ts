import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const isAdminGuard: CanActivateFn =
    async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const currentRole = inject(AuthService).currentRole();
        if (currentRole?.isAdmin) {
            return true;
        }

        const router = inject(Router);
        router.navigateByUrl("/403");
        return false;
    };