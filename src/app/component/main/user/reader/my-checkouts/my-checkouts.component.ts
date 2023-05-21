import {Component} from '@angular/core';
import {BookPreview} from "../../../../../dto/book/book-preview.dto";
import {UserService} from "../../../../../service/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-my-checkouts',
    templateUrl: './my-checkouts.component.html'
})
export class MyCheckoutsComponent {
    protected books: BookPreview[] = [];
    protected showNoData = false;

    constructor(private userService: UserService,
                private message: NzMessageService) {
    }

    private ngOnInit() {
        this.userService.getLoggedInUserCurrentCheckoutBookPreviews().subscribe({
            next: value => {
                if (value.length === 0) {
                    this.showNoData = true;
                }
                this.books = value.map(e => ({
                    id: e.id,
                    title: e.bookCopy.book.title,
                    photoUrl: e.bookCopy.book.photoUrl
                }));
            },
            error: (err) => {
                this.showNoData = true;
                this.message.error(err.error.message)
            }
        })
    }
}
