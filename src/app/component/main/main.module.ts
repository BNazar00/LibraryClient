import {NgModule} from "@angular/core";
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgTemplateOutlet} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MainComponent} from "./main.component";
import {HeaderComponent} from "./header/header.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NavMenuComponent} from "./header/nav-menu/nav-menu.component";
import {AuthMenuComponent} from "./header/auth-menu/auth-menu.component";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {AuthorsComponent} from "./home/authors/authors.component";
import {BooksComponent} from "./home/books/books.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {FormReaderTicketComponent} from './user/form-reader-ticket/form-reader-ticket.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {MyBooksComponent} from './user/reader/my-books/my-books.component';
import {BooksTableComponent} from "../util/books-table/books-table.component";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {AddBookComponent} from './admin/add-book/add-book.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        NavMenuComponent,
        AuthMenuComponent,
        AuthorsComponent,
        BooksComponent,
        FormReaderTicketComponent,
        BooksTableComponent,
        MyBooksComponent,
        AddBookComponent
    ],
    imports: [
        NgClass,
        NzButtonModule,
        RouterOutlet,
        NzMenuModule,
        NgIf,
        NzAvatarModule,
        NzDropDownModule,
        NzIconModule,
        NgOptimizedImage,
        NzCardModule,
        RouterLinkActive,
        RouterLink,
        NzFormModule,
        NzInputModule,
        NzSelectModule,
        FormsModule,
        NgForOf,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzTypographyModule,
        NgTemplateOutlet,
        NzInputNumberModule,
        NzAutocompleteModule
    ],
    exports: [MainComponent, BooksTableComponent]
})
export class MainModule {
}
