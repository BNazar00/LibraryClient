import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        const token = localStorage.getItem('access_token');

        if (token) {
            const request = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });

            return next.handle(request);
        }

        return next.handle(req);
    }
}
