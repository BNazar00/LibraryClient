import {Component} from '@angular/core';
import {BookPreview} from "../../../../dto/book/book-preview.dto";
import {NzMessageService} from "ng-zorro-antd/message";
import {BookService} from "../../../../service/book.service";

@Component({
    selector: 'app-all-subjects',
    templateUrl: './books.component.html'
})
export class BooksComponent {
    protected books: BookPreview[] = [];
    protected showNoData = false;

    constructor(private bookService: BookService,
                private message: NzMessageService) {
    }

    private ngOnInit() {
        this.bookService.getAllBookPreviewsOrderByCheckoutCount().subscribe({
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
