import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../../service/auth/auth.service";
import {ROLE} from "../../../core/constant/role.enum";

@Injectable({
    providedIn: 'root'
})
export class UserGuard {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isUserHasRoles([ROLE.USER])) {
            return true;
        }

        this.router.navigate(["not-found"]);
        return false;
    }
}
