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
    bestsellers: BookPreview[] = [
        {
            id: 1,
            title: "Test",
            // author: {firstName: "aFN", lastName: "aLN"},
            // publisher: {name: "pN"},
            // publicationYear: 2023,
            // type: {name: "tN"},
            // pageCount: 250,
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
            // price: 99
        },
        {
            id: 1,
            title: "Test2",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/webform/ebook_feature_application/876/colonial-war---kindle---high-resolution---book-1.jpg?itok=5zFSaHMe",
        },
        {
            id: 1,
            title: "Test",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
        },
        {
            id: 1,
            title: "Test2",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/webform/ebook_feature_application/876/colonial-war---kindle---high-resolution---book-1.jpg?itok=5zFSaHMe",
        }
    ]

    arrivals: BookPreview[] = [
        {
            id: 1,
            title: "Test",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
        },
        {
            id: 1,
            title: "Test2",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/webform/ebook_feature_application/876/colonial-war---kindle---high-resolution---book-1.jpg?itok=5zFSaHMe",
        },
        {
            id: 1,
            title: "Test",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
        },
        {
            id: 1,
            title: "Test2",
            photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/webform/ebook_feature_application/876/colonial-war---kindle---high-resolution---book-1.jpg?itok=5zFSaHMe",
        }
    ]
    constructor(private message: NzMessageService,
                private router: Router
    ) {
    }

    onAllBooksButtonClick = () => {
        this.router.navigate(["all-books"]);
    }
}
