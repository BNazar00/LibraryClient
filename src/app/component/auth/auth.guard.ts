import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../service/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoggedIn = this.authService.isLoggedIn();

        if (isLoggedIn && (state.url === '/login' || state.url === '/register')) {
            this.router.navigate(['/']);
            return false;
        } else if (!isLoggedIn && state.url !== '/login' && state.url !== '/register') {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}




