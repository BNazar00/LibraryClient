import {Book} from "./book.dto";

export interface Checkout {
    id: number;
    userId: number;
    issueDate: Date;
    returnDate: Date
    bookCopy: {
        id: number;
        book: Book
    };
    status: string
}
