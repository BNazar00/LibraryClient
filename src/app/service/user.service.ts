import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core/constant/constants";
import {map, Observable} from "rxjs";
import {CheckoutPreview} from "../dto/book/checkout-preview.dto";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    existsUserByEmail = (email: string): Observable<boolean> => {
        return this.http.get<boolean>(`${BASE_URL}/api/v1/user`, {params: {email}, observe: 'response'}).pipe(
            map((response) => {
                return response.status === 200;
            })
        );
    }

    getLoggedInUserCurrentCheckoutBookPreviews = () => {
        return this.http.get<CheckoutPreview[]>(`${BASE_URL}/api/v1/user/checkout/current`)
    }
}
