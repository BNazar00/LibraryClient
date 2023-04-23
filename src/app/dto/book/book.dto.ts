import {AuthorPreview} from "../author/author-preview.dto";
import {Type} from "../book-type.dto";
import {Publisher} from "../publisher.dto";

export interface Book {
    id: number;
    title: string;
    author: AuthorPreview;
    publisher: Publisher;
    publicationYear: number;
    type: Type;
    pageCount: number;
    photoUrl: string;
    price: number;
}
