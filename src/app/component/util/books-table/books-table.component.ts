import {Component, Input} from '@angular/core';
import {BookPreview} from "../../../dto/book/book-preview.dto";

@Component({
    selector: 'app-books-table',
    templateUrl: './books-table.component.html',
    styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent {
    @Input() title: string = "";
    @Input() books: BookPreview[] = [];
    goToBookDescription = (id: number) => {
        console.log("test ", id);
    };
}
