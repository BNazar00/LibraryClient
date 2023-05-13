import {Component} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {BookPreview} from "../../../dto/book/book-preview.dto";
import {Router} from "@angular/router";
import {BookService} from "../../../service/book.service";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    bestsellers: BookPreview[] = [{} as BookPreview];

    latestArrivals: BookPreview[] = [{} as BookPreview];

    constructor(private message: NzMessageService,
                private router: Router,
                private bookService: BookService
    ) {
    }

    onAllBooksButtonClick = () => {
        this.router.navigate(["all-books"]);
    }

    private async ngOnInit(): Promise<void> {
        try {
            this.bestsellers = await firstValueFrom(this.bookService.getTop10Bestsellers());
        } catch (error) {
            this.bestsellers = [];
        }
        try {
            this.latestArrivals = await firstValueFrom(this.bookService.getTop10LatestArrivals());
        } catch (error) {
            this.latestArrivals = [];
        }
    }
}
