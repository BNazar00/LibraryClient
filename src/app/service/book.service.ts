import {Injectable} from "@angular/core";
import {BASE_URL} from "../core/constant/constants";
import {HttpClient} from "@angular/common/http";
import {BookPreview} from "../dto/book/book-preview.dto";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private http: HttpClient) {
    }

    getTop10Bestsellers = () => {
        return this.http.get<BookPreview[]>(`${BASE_URL}/api/v1/book/bestsellers`);
    }

    getTop10LatestArrivals = () => {
        return this.http.get<BookPreview[]>(`${BASE_URL}/api/v1/book/latest-arrivals`);
    }
}
