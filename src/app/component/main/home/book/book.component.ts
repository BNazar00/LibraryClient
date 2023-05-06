import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../../dto/book/book.dto";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})
export class BookComponent {
    protected book: Book | undefined;

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id == null || isNaN(+id)) {
            this.router.navigate(["/"]);
            return;
        }

        this.book = this.getBook(+id)
    }

    protected checkOut = () => {
        this.router.navigate([`/book/checkout/${this.book!.id}`])
    };

    private getBook = (id: number): Book => {
        return {
            id: id,
            title: "Title",
            author: {id: 1, lastName: "aLN", firstName: "aFN"},
            publisher: {id: 1, name: "pN"},
            publicationYear: 2023,
            pageCount: 199,
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
            price: 0.99,
            availableCount: 2
        }
    };
}
