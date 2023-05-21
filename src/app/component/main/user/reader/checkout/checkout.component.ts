import {Component} from '@angular/core';
import {Address} from "../../../../../dto/address.dto";
import {Book} from "../../../../../dto/book/book.dto";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CheckoutCreateRequest} from "../../../../../dto/book/checkout-create-request.dto";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";
import {BookService} from "../../../../../service/book.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
    protected address: Address = {id: 1, name: "Hollywood"}
    protected book: Book | undefined;
    protected showNoData: boolean = false;
    protected paymentMethod = undefined;

    protected orderState = false;
    protected timePeriod = {
        startDate: new Date(),
        endDate: undefined
    }
    protected price = "0";
    protected accountBalance = "100";
    protected buttonLoading = false;
    private checkoutRequest: CheckoutCreateRequest = {
        bookId: 0,
        returnDate: undefined
    }

    constructor(protected datePipe: DatePipe,
                private route: ActivatedRoute,
                private router: Router,
                private bookService: BookService,
                private message: NzMessageService,
                private modal: NzModalService) {
    }

    protected isDisabledDate = (current: Date): boolean => {
        const weekFromNow = new Date();
        weekFromNow.setDate(new Date().getDate() + 6);
        return current < weekFromNow;
    }

    protected onChange(): void {
        this.orderState = !!this.timePeriod.endDate && this.paymentMethod;
        if (!this.timePeriod.endDate) {
            return
        }
        this.checkoutRequest.returnDate = this.timePeriod.endDate;

        const endDate = this.timePeriod.endDate as Date;
        console.log(endDate)
        const diffInMs = endDate.getTime() - this.timePeriod.startDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        this.price = (diffInDays * this.book!.price).toFixed(2);
    }

    protected checkout = () => {
        if (!this.orderState) {
            this.message.error("Check all the data!")
            return;
        }

        this.buttonLoading = true;
        this.bookService.checkoutBook(this.checkoutRequest).subscribe({
            next: (value) => {
                this.buttonLoading = false;
                this.modal.success({
                    nzOnOk: () => this.router.navigate(["/my-checkouts"]),
                    nzCloseIcon: "",
                    nzTitle: 'Operation success!',
                    nzContent: `Your book storage operation id: ${value}`
                });
            },
            error: (err) => {
                this.buttonLoading = false;
                this.message.error(err.error.message)
            }
        })
    };

    private ngOnInit(): void {
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
                this.book = value;
                this.checkoutRequest.bookId = value.id;
            },
            error: () => this.showNoData = true
        })

    }
}
