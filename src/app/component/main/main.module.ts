import {NgModule} from "@angular/core";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
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
import { FormReaderTicketComponent } from './user/form-reader-ticket/form-reader-ticket.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddBookComponent} from './admin/add-book/add-book.component';

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        NavMenuComponent,
        AuthMenuComponent,
        AuthorsComponent,
        BooksComponent,
        FormReaderTicketComponent,
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
        ReactiveFormsModule
    ],
    exports: [MainComponent]
})
export class MainModule {
}
