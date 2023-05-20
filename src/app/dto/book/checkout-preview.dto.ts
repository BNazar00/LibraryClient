import {BookPreview} from "./book-preview.dto";

export interface CheckoutPreview{
    id: number;
    bookCopy: {
        id: number;
        book: BookPreview
    };
}
