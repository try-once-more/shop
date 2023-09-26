import { Injectable, signal } from "@angular/core";
import { RoleModel } from "../models/role-model";
import { Observable, delay, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    private readonly _currentRole = signal<RoleModel | undefined>(undefined);

    readonly currentRole = this._currentRole.asReadonly();
    readonly roles: ReadonlyArray<RoleModel> = [
        {
            name: "User",
            isAdmin: false
        } as const,
        {
            name: "Admin",
            isAdmin: true
        } as const
    ];

    login(role: RoleModel): Observable<RoleModel> {
        return of(role).pipe(
            delay(1000),
            tap(role => {
                this._currentRole.set(role);
            })
        );
    }

    logout(): void {
        this._currentRole.set(undefined);
    }
}
