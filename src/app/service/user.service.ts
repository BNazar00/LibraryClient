import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core/constant/constants";
import {map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    existsUserByEmail = (email: string): Observable<boolean> => {
        return this.http.get<boolean>(`${BASE_URL}/user`, {params: {email}, observe: 'response'}).pipe(
            map((response) => {
                return response.status === 200;
            })
        );
    }
}
