import {Component} from '@angular/core';
import {BookPreview} from "../../../../../dto/book/book-preview.dto";

@Component({
    selector: 'app-my-books',
    templateUrl: './my-books.component.html'
})
export class MyBooksComponent {
    protected books: BookPreview[] = []
}
