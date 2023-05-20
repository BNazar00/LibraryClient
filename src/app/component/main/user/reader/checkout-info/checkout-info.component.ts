import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../../service/book.service";
import {Checkout} from "../../../../../dto/book/checkout.dto";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-checkout-info',
    templateUrl: './checkout-info.component.html'
})
export class CheckoutInfoComponent implements OnInit {
    protected checkout: Checkout | undefined;
    protected showNoData: boolean = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private bookService: BookService,
                protected datePipe: DatePipe) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id == null || isNaN(+id)) {
            this.router.navigate(["/"]);
            return;
        }

        this.bookService.getCheckoutInfo(+id).subscribe({
            next: value => {
                if (!value) {
                    this.showNoData = true;
                    return;
                }
                this.checkout = value;
            },
            error: () => this.showNoData = true
        })
    }
}
