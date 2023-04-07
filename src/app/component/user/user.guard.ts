import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../service/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserGuard {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isUser()) {
            return true;
        }

        this.router.navigate(['/access-denied']);
        return false;
    }
}
