import {Component, Input} from '@angular/core';
import {BookPreview} from "../../../dto/book/book-preview.dto";
import {Router} from "@angular/router";

@Component({
    selector: 'app-books-table',
    templateUrl: './books-table.component.html',
    styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent {
    @Input() title: string = "";
    @Input() books: BookPreview[] = [];

    constructor(private router: Router) {
    }

    goToBookDescription = (id: number) => {
        this.router.navigate([`book/${id}`])
    };
}
