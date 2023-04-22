import {Author} from "../author.dto";
import {Type} from "../book-type.dto";
import {Publisher} from "../publisher.dto";

export interface Book {
    id: number;
    title: string;
    author: Author;
    publisher: Publisher;
    publicationYear: number;
    type: Type;
    pageCount: number;
    photoUrl: string;
    price: number;
}