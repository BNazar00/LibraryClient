import {Injectable} from '@angular/core';
import {BASE_URL, ROLE_DATA} from "../../core/constants";
import {HttpClient} from "@angular/common/http";
import {AuthenticationRequest} from "../../dto/auth/authentication-request.dto";
import {AuthenticationResponse} from "../../dto/auth/authentication-response.dto";
import {Observable, tap} from "rxjs";
import {RegisterRequest} from "../../dto/auth/register-request.dto";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private URL: string = BASE_URL + "/auth";

    constructor(private http: HttpClient, private router: Router, private message: NzMessageService) {
    }

    login = (authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> => {
        return this.http.post<any>(this.URL + '/login', authenticationRequest).pipe(
            tap((response: AuthenticationResponse) => {
                this.setSession(response);
            })
        );
    }

    register = (registerRequest: RegisterRequest): Observable<AuthenticationResponse> => {
        return this.http.post<any>(this.URL + '/register', registerRequest).pipe(
            tap((response: AuthenticationResponse) => {
                this.setSession(response);
                this.router.navigate(['']);
            })
        );
    }

    logout = (): void => {
        this.http.get<any>(this.URL + '/logout').subscribe({
            next: () => {
                localStorage.removeItem('access_token');
                this.message.success("You've been successfully logged out!")
            },
            error: (error) => {
                this.message.error("HTTP request failed: ", error);
            }
        });
    }

    isLoggedIn = (): boolean => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expiresAt = new Date(tokenPayload.exp).valueOf() * 1000;
        return new Date().getTime() < expiresAt;
    }

    isAdmin = (): boolean => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        return JSON.parse(tokenPayload.roles).includes(ROLE_DATA.ADMIN);
    }

    isUser = (): boolean => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        return JSON.parse(tokenPayload.roles).includes(ROLE_DATA.USER);
    }

    private setSession = (authResult: AuthenticationResponse): void => {
        localStorage.setItem('access_token', authResult.token);
    }
}

