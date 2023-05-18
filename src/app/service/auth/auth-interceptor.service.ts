import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
        const token = localStorage.getItem('access_token');

        if (token) {
            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const expiresAt = new Date(tokenPayload.exp).valueOf() * 1000;

            if (new Date().getTime() < expiresAt) {
                const request = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${token}`)
                });
                return next.handle(request);
            }

            localStorage.removeItem('access_token');
            return next.handle(req);
        }

        return next.handle(req);
    }
}
