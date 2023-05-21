import {Component} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {BookService} from "../../../../service/book.service";
import {Checkout} from "../../../../dto/book/checkout.dto";
import {DatePipe} from "@angular/common";
import {DATE_FORMAT} from "../../../../core/constant/constants";
import {CheckoutStatus} from "../../../../core/constant/checkout-status.enum";

@Component({
    selector: 'app-all-checkouts',
    templateUrl: './all-checkouts.component.html',
    styleUrls: ['./all-checkouts.component.scss']
})
export class AllCheckoutsComponent {
    protected titleSearchValue = '';
    protected statusSearchValue: CheckoutStatus[] = [];
    protected idSearchValue = '';
    protected bookCopyIdSearchValue = '';

    protected titleSearchVisible = false;
    protected statusSearchVisible = false;
    protected idSearchVisible = false;
    protected bookCopyIdSearchVisible = false;

    protected editCache: { [key: number]: { edit: boolean; data: Checkout } } = {};
    protected listOfColumn = [
        {
            title: 'id',
            compare: (a: Checkout, b: Checkout) => a.id - b.id,
            priority: false,
            width: "8%"
        },
        {
            title: 'User',
            compare: (a: Checkout, b: Checkout) => a.userId - b.userId,
            priority: false,
            width: "8%"
        },
        {
            title: 'BC id',
            compare: (a: Checkout, b: Checkout) => a.bookCopy.id - b.bookCopy.id,
            priority: 5,
            width: "8%"
        },
        {
            title: 'Book title',
            compare: (a: Checkout, b: Checkout) => a.bookCopy.book.title.localeCompare(b.bookCopy.book.title),
            priority: 3,
            width: "17%"
        },
        {
            title: 'Issue date',
            compare: (a: Checkout, b: Checkout) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime(),
            priority: 1,
            width: "15%"
        },
        {
            title: 'Return date',
            compare: (a: Checkout, b: Checkout) => new Date(a.returnDate).getTime() - new Date(b.returnDate).getTime(),
            priority: 2,
            width: "15%"
        },
        {
            title: 'Status',
            compare: (a: Checkout, b: Checkout) => a.status.localeCompare(b.status),
            priority: 4,
            width: "15%"
        }
    ];
    protected listOfData: Checkout[] = [];
    protected listOfDisplayData: Checkout[] = [];
    protected dateFormat = DATE_FORMAT;
    protected checkoutStatusOptions = Object.values(CheckoutStatus);
    private currentIssueDate: Date | undefined;

    constructor(protected datePipe: DatePipe,
                private message: NzMessageService,
                private bookService: BookService) {
    }

    getCheckoutStatusOptions(status: string) {
        if (status === CheckoutStatus.WAITING) {
            return [status, CheckoutStatus.IN_PROGRESS, CheckoutStatus.CANCELED];
        } else {
            return [status, CheckoutStatus.CANCELED, CheckoutStatus.DONE]
        }
    }

    protected resetSearch(): void {
        this.titleSearchValue = '';
        this.statusSearchValue = [];
        this.idSearchValue = '';
        this.bookCopyIdSearchValue = '';
        this.search();
    }

    protected search(): void {
        this.titleSearchVisible = false;
        this.statusSearchVisible = false;
        this.idSearchVisible = false;
        this.bookCopyIdSearchVisible = false;

        this.listOfDisplayData = this.listOfData.filter((item: Checkout) =>
            item.bookCopy.book.title.toLowerCase().includes(this.titleSearchValue.toLowerCase())
            && (this.statusSearchValue.length === 0 ? true : this.statusSearchValue.includes(
                item.status as CheckoutStatus))
            && (this.idSearchValue.length === 0 ? true : String(item.id) === this.idSearchValue)
            && (this.bookCopyIdSearchValue.length === 0 ? true : String(item.bookCopy.id) === this.bookCopyIdSearchValue)
        )
    }

    protected startEdit(id: number): void {
        const issueDate = new Date(this.editCache[id].data.issueDate)
        this.editCache[id].data.issueDate = issueDate
        this.currentIssueDate = issueDate

        this.editCache[id].data.returnDate = new Date(this.editCache[id].data.returnDate)
        this.editCache[id].edit = true;
    }

    protected cancelEdit(id: number): void {
        const index = this.listOfData.findIndex(item => item.id === id);
        this.editCache[id] = {
            data: {...this.listOfData[index]},
            edit: false
        };
    }

    protected saveEdit(id: number): void {
        const checkout = this.editCache[id].data;
        checkout.issueDate.setHours(12);
        checkout.returnDate.setHours(12);

        this.bookService.updateCheckout({
            id: id,
            issueDate: checkout.issueDate,
            returnDate: checkout.returnDate,
            status: checkout.status as CheckoutStatus
        }).subscribe({
            next: () => {
                const index = this.listOfData.findIndex(item => item.id === id);
                Object.assign(this.listOfData[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.message.success("Checkout was successfully saved!");
            },
            error: (err) => this.message.error("Error saving checkout, " + err.error.message)
        })
    }

    protected isDisabledDateInIssueCalendar = (current: Date): boolean => {
        return current < this.currentIssueDate!;
    }

    protected isDisabledDateInReturnCalendar = (current: Date): boolean => {
        return current <= this.currentIssueDate!;
    }

    protected isDisabledEditing(status: string) {
        return status === 'DONE' || status === 'CANCELED';
    }

    private ngOnInit(): void {
        this.bookService.getAllCheckouts().subscribe({
            next: value => {
                let data = value
                this.listOfData = data;
                this.listOfDisplayData = [...data]
                this.updateEditCache();
            },
            error: err => {
                console.log(err)
                this.message.error(err.error.message)
            }
        })
    }

    private updateEditCache(): void {
        this.listOfData.forEach(item => {
            this.editCache[item.id] = {
                edit: false,
                data: {...item}
            };
        });
    }
}
