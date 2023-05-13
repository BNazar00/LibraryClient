import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "../core/constant/constants";
import {catchError, map, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private http: HttpClient) {
    }

    deleteImage(imageName: string) {
        return this.http.delete<boolean>(BASE_URL + "/api/v1/image", {params: {imageName}}).pipe(
            map(() => true),
            catchError(() => of(false))
        );
    }
}
