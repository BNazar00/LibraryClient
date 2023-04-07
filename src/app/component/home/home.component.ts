import {Component} from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(public authService: AuthService, private message: NzMessageService) {
    }

    sayHi = (): void => {
        this.message.success("hi!");
    }
}
