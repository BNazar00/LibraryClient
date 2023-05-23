import {AuthorPreview} from "../author/author-preview.dto";
import {Publisher} from "../publisher.dto";

export interface Book {
    id: number;
    title: string;
    author: AuthorPreview;
    photoUrl: string;
    publisher: Publisher;
    publicationYear: number;
    pageCount: number;
    availableCount: number;
    copiesCount: number;
    price: number;
}
