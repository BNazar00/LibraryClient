import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../service/auth/auth.service";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
    constructor(public router: Router, public authService: AuthService) {
    }

    selectMenuItem(menu: string): void {
        if (menu === 'home') {
            this.router.navigate(['/']);
        } else if (menu === 'authors') {
            this.router.navigate(['/authors']);
        }
    }
}
