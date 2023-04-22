import {Component} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {BookPreview} from "../../../dto/book/book-preview.dto";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    bestsellers: BookPreview[] = []
    arrivals: BookPreview[] = []

    constructor(private message: NzMessageService,
                private router: Router
    ) {
    }

    onAllBooksButtonClick = () => {
        this.router.navigate(["all-books"]);
    }
}
