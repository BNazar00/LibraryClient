import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core/constant/constants";
import {map, Observable} from "rxjs";
import {BookPreview} from "../dto/book/book-preview.dto";

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

    getLoggedInUserBooks= ()=>{
        return this.http.get<BookPreview[]>(`${BASE_URL}/api/v1/user/books`)
    }
}
