import {Injectable} from "@angular/core";
import {BASE_URL} from "../core/constant/constants";
import {HttpClient} from "@angular/common/http";
import {BookPreview} from "../dto/book/book-preview.dto";
import {Book} from "../dto/book/book.dto";
import {CheckoutRequest} from "../dto/book/checkout-request.dto";
import {Checkout} from "../dto/book/checkout.dto";

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private http: HttpClient) {
    }

    getAllBooks = () => {
        return this.http.get<Book[]>(`${BASE_URL}/api/v1/book/admin/all`);
    }

    getBookById = (id: number) => {
        return this.http.get<Book>(`${BASE_URL}/api/v1/book/${id}`);
    }

    getTop10Bestsellers = () => {
        return this.http.get<BookPreview[]>(`${BASE_URL}/api/v1/book/bestsellers`);
    }

    getTop10LatestArrivals = () => {
        return this.http.get<BookPreview[]>(`${BASE_URL}/api/v1/book/latest-arrivals`);
    }

    checkoutBook = (data: CheckoutRequest) => {
        return this.http.post<void>(`${BASE_URL}/api/v1/book/checkout`, data);
    }

    getCheckoutInfo = (id: number) => {
        return this.http.get<Checkout>(`${BASE_URL}/api/v1/book/checkout/${id}`)
    }
}
