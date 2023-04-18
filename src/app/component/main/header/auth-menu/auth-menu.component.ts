import {Component} from '@angular/core';
import {AuthService} from "../../../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-auth-menu',
    templateUrl: './auth-menu.component.html',
    styleUrls: ['./auth-menu.component.scss']
})
export class AuthMenuComponent {
    constructor(public authService: AuthService, public router: Router) {
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
