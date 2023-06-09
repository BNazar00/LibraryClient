import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./component/main/main.component";
import {AuthGuard} from "./component/auth/auth.guard";
import {LoginComponent} from "./component/auth/login/login.component";
import {RegisterComponent} from "./component/auth/register/register.component";
import {AuthModule} from "./component/auth/auth.module";
import {Interceptor} from "./service/auth/auth-interceptor.service";
import {NzButtonModule} from "ng-zorro-antd/button";
import {MainModule} from "./component/main/main.module";
import {HomeComponent} from "./component/main/home/home.component";
import {AdminGuard} from "./component/main/admin/admin.guard";
import {AuthorsComponent} from "./component/main/home/authors/authors.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NotFoundComponent} from './component/util/exception-handler/not-found/not-found.component';
import {NzResultModule} from "ng-zorro-antd/result";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {FormReaderTicketComponent} from "./component/main/user/form-reader-ticket/form-reader-ticket.component";
import {MyCheckoutsComponent} from "./component/main/user/reader/my-checkouts/my-checkouts.component";
import {AddBookComponent} from "./component/main/admin/add-book/add-book.component";
import {UserGuard} from "./component/main/user/user.guard";
import {AllBooksComponent} from "./component/main/admin/all-books/all-books.component";
import {BookComponent} from "./component/main/home/book/book.component";
import {CheckoutComponent} from "./component/main/user/reader/checkout/checkout.component";
import {CheckoutInfoComponent} from "./component/main/user/reader/checkout-info/checkout-info.component";
import {ReaderGuard} from "./component/main/user/reader/reader.guard";
import {AllCheckoutsComponent} from "./component/main/admin/all-checkouts/all-checkouts.component";
import {BooksComponent} from "./component/main/home/books/books.component";

registerLocaleData(en);
const appRoute: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {path: "", component: HomeComponent},
            {path: "authors", component: AuthorsComponent},

            {path: "form-reader-ticket", component: FormReaderTicketComponent, canActivate: [UserGuard]},

            {path: "book/:id", component: BookComponent},
            {path: "all-books", component: BooksComponent},
            {path: "book/checkout/:id", component: CheckoutComponent, canActivate: [ReaderGuard]},

            {path: "my-checkouts", component: MyCheckoutsComponent, canActivate: [ReaderGuard]},
            {path: "my-checkout/:id", component: CheckoutInfoComponent, canActivate: [ReaderGuard]},

            {path: "admin/add-book", component: AddBookComponent, canActivate: [AdminGuard]},
            {path: "admin/all-books", component: AllBooksComponent, canActivate: [AdminGuard]},
            {path: "admin/all-checkouts", component: AllCheckoutsComponent, canActivate: [AdminGuard]},

            {path: "not-found", component: NotFoundComponent},
        ]
    },
    {path: "login", component: LoginComponent, canActivate: [AuthGuard]},
    {path: "register", component: RegisterComponent},
    {path: "**", redirectTo: "not-found"}
]

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        MainModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoute),
        NzButtonModule,
        NzCardModule,
        NzTypographyModule,
        NzResultModule,
        NzEmptyModule
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
