import {Component} from '@angular/core';
import {Address} from "../../../../dto/address.dto";
import {Book} from "../../../../dto/book/book.dto";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BookCheckoutRequest} from "../../../../dto/book/checkout/book-checkout-request.dto";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
    selector: 'app-book-checkout',
    templateUrl: './book-checkout.component.html',
    styleUrls: ['./book-checkout.component.scss']
})
export class BookCheckoutComponent {
    protected address: Address = {id: 1, name: "Hollywood"}
    protected book: Book | null = null;
    protected paymentMethod = null;

    protected orderState = false;
    protected timePeriod = {
        startDate: new Date(),
        endDate: null
    }
    protected price = "0";
    protected accountBalance = "100";
    protected buttonLoading = false;
    private checkoutRequest: BookCheckoutRequest = {
        bookId: 0,
        timePeriod: this.timePeriod
    }

    constructor(protected datePipe: DatePipe,
                private route: ActivatedRoute,
                private router: Router,
                private message: NzMessageService,
                private modal: NzModalService) {
    }

    protected isDisabledDate = (current: Date): boolean => {
        const today = new Date();
        return current < today;
    }

    protected onChange(): void {
        this.orderState = this.timePeriod.endDate !== null && this.paymentMethod !== null;
        if (!this.timePeriod.endDate) {
            return
        }
        const endDate = this.timePeriod.endDate as Date;
        const diffInMs = endDate.getTime() - this.timePeriod.startDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        this.price = (diffInDays * this.book!.price).toFixed(2);
    }

    protected checkout = () => {
        if (!this.orderState) {
            this.message.error("Check all the data!")
            return;
        }

        this.buttonLoading = true
        setTimeout(() => {
            this.buttonLoading = false;
            this.modal.success({
                nzOnOk: () => this.router.navigate(["/"]),
                nzCloseIcon: "",
                nzTitle: 'Operation success!',
                nzContent: 'Your book storage operation id: 000'
            });

        }, 2000);

    };

    private ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id')
        if (id == null || isNaN(+id)) {
            this.router.navigate(["/"]);
            return;
        }

        this.book = this.getBook(+id)
        this.checkoutRequest.bookId = this.book.id;
    }

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
    }
}
