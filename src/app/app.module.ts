import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./component/home/home.component";
import {TestComponent} from "./component/admin/test/test.component";
import {AuthGuard} from "./component/auth/auth.guard";
import {AdminGuard} from "./component/admin/admin.guard";
import {LoginComponent} from "./component/auth/login/login.component";
import {RegisterComponent} from "./component/auth/register/register.component";
import {AuthModule} from "./component/auth/auth.module";
import {Interceptor} from "./service/auth/auth-interceptor.service";
import {NzButtonModule} from "ng-zorro-antd/button";

registerLocaleData(en);
const appRoute: Routes = [
    {path: "", component: HomeComponent},
    {path: "admin", component: TestComponent, canActivate: [AuthGuard, AdminGuard]},
    {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    {path: 'register', component: RegisterComponent},
    {path: '**', redirectTo: '' }
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TestComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoute),
        NzButtonModule
    ],
    providers: [
        {provide: NZ_I18N, useValue: en_US},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
