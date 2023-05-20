import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../../../dto/book/book.dto";
import {BookService} from "../../../../service/book.service";
import {AuthService} from "../../../../service/auth/auth.service";
import {ROLE} from "../../../../core/constant/role.enum";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html'
})
export class BookComponent {
    protected book: Book | undefined;
    protected showNoData: boolean = false;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private bookService: BookService,
                private authService: AuthService,
                private message: NzMessageService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id == null || isNaN(+id)) {
            this.router.navigate(["/"]);
            return;
        }

        this.bookService.getBookById(+id).subscribe({
            next: value => {
                if (!value) {
                    this.showNoData = true;
                    return;
                }
                this.book = value
            },
            error: () => this.showNoData = true
        })
    }

    protected checkOut = () => {
        if (this.authService.isUserHasRoles([ROLE.READER])) {
            this.router.navigate([`/book/checkout/${this.book!.id}`]);

        } else {
            this.message.warning("A reader ticket is needed")
        }
    };
}
