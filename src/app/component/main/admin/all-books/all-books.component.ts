import {Component} from '@angular/core';
import {Book} from "../../../../dto/book/book.dto";
import {BookService} from "../../../../service/book.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CheckoutStatus} from "../../../../core/constant/checkout-status.enum";

@Component({
    selector: 'app-all-books',
    templateUrl: './all-books.component.html',
    styleUrls: ['./all-books.component.scss']
})
export class AllBooksComponent {
    protected searchValue = '';
    protected searchVisible = false;
    protected editCache: { [key: number]: { edit: boolean; data: Book } } = {};
    protected listOfColumn = [
        {
            title: 'Title',
            compare: (a: Book, b: Book) => a.title.localeCompare(b.title),
            priority: false,
            width: 25
        },
        {
            title: 'Publication year',
            compare: (a: Book, b: Book) => a.publicationYear - b.publicationYear,
            priority: 3,
            width: 15
        },
        {
            title: 'Page count',
            compare: (a: Book, b: Book) => a.pageCount - b.pageCount,
            priority: 2,
            width: 10
        },
        {
            title: 'copiesCount',
            compare: (a: Book, b: Book) => a.copiesCount - b.copiesCount,
            priority: 2,
            width: 10
        },
        {
            title: 'availableCount',
            compare: (a: Book, b: Book) => a.availableCount - b.availableCount,
            priority: 2,
            width: 10
        },
        {
            title: 'Price',
            compare: (a: Book, b: Book) => a.price - b.price,
            priority: 1,
            width: 10
        }
    ];
    protected listOfData: Book[] = [];
    protected listOfDisplayData: Book[] = [];

    constructor(private message: NzMessageService,
                private bookService: BookService) {
    }

    protected resetSearch(): void {
        this.searchValue = '';
        this.search();
    }

    protected search(): void {
        this.searchVisible = false;
        this.listOfDisplayData = this.listOfData.filter((item: Book) =>
            item.title.toLowerCase().includes(this.searchValue.toLowerCase()));
    }

    protected startEdit(id: number): void {
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
        const book = this.editCache[id].data;

        this.bookService.updateBook({
            id: id,
            publicationYear: book.publicationYear,
            pageCount: book.pageCount,
            price: book.price
        }).subscribe({
            next: () => {
                const index = this.listOfData.findIndex(item => item.id === id);
                Object.assign(this.listOfData[index], this.editCache[id].data);
                this.editCache[id].edit = false;
                this.message.success("Book was successfully saved!");
            },
            error: (err) => this.message.error("Error saving book, " + err.error.message)
        })

    }

    private ngOnInit(): void {
        this.bookService.getAllBooks().subscribe({
            next: value => {
                let data = value
                this.listOfData = data;
                this.listOfDisplayData = [...data]
                this.updateEditCache();
            },
            error: err => {
                console.log(err)
                this.message.error(err.message)
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
