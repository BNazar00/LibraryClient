import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../../../../core/constants";
import {tap} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss']
})
export class TestComponent {
    constructor(private http: HttpClient, private message: NzMessageService) {
    }

    sendRequest() {
        this.http.get<any>(BASE_URL + "/demo-controller").pipe(
            tap((response) => {
                this.message.success(response.message);
            })).subscribe({
            error: err => this.message.error(err.error.message)
        });
    }
}
