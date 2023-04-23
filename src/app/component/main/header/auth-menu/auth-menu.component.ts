import {Component} from '@angular/core';
import {AuthService} from "../../../../service/auth/auth.service";
import {Router} from "@angular/router";
import {ROLE} from "../../../../core/constant/role.enum";

@Component({
    selector: 'app-auth-menu',
    templateUrl: './auth-menu.component.html',
    styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent {
    protected readonly ROLE = ROLE;

    constructor(public authService: AuthService, public router: Router) {
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
