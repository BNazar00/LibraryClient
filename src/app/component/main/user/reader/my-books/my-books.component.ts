import {Component} from '@angular/core';
import {BookPreview} from "../../../../../dto/book/book-preview.dto";
import {UserService} from "../../../../../service/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-my-books',
    templateUrl: './my-books.component.html'
})
export class MyBooksComponent {
    protected books: BookPreview[] = [];
    protected showNoData = false;

    constructor(private userService: UserService,
                private message: NzMessageService) {
    }

    private ngOnInit() {
        this.userService.getLoggedInUserBooks().subscribe({
            next: value => {
                if (value.length === 0) {
                    this.showNoData = true;
                }
                this.books = value;
            },
            error: (err) => {
                this.showNoData = true;
                this.message.error(err.error.message)
            }
        })
    }
}
