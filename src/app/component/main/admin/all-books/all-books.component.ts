import {Component} from '@angular/core';
import {Book} from "../../../../dto/book/book.dto";

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
            title: 'publicationYear',
            compare: (a: Book, b: Book) => a.publicationYear - b.publicationYear,
            priority: 3,
            width: 15
        },
        {
            title: 'pageCount',
            compare: (a: Book, b: Book) => a.pageCount - b.pageCount,
            priority: 2,
            width: 20
        },
        {
            title: 'price',
            compare: (a: Book, b: Book) => a.price - b.price,
            priority: 1,
            width: 20
        }
    ];
    protected listOfData: Book[] = [];
    protected listOfDisplayData: Book[] = [];

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
        const index = this.listOfData.findIndex(item => item.id === id);
        Object.assign(this.listOfData[index], this.editCache[id].data);
        this.editCache[id].edit = false;
    }

    private ngOnInit(): void {
        const data: Book[] = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                id: i,
                title: `Test ${i}`,
                author: {id: i, firstName: `AFName ${i}`, lastName: `ALName ${i}`},
                publisher: {id: i, name: `PName ${i}`},
                publicationYear: 2023 + i,
                pageCount: 200 + i,
                photoUrl: "https://manybooks.net/sites/default/files/styles/220x330sc/public/old-covers/cover-cust-13095.jpg?itok=H0c1QL8Y",
                price: 0.99 + i / 2
            });
        }
        this.listOfData = data;
        this.listOfDisplayData = [...data]
        this.updateEditCache();
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
