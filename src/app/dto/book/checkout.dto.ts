import {Book} from "./book.dto";

export interface Checkout {
    id: number;
    issueDate: Date;
    returnDate: Date
    bookCopy: {
        id: number;
        book: Book
    };
    status: string
}