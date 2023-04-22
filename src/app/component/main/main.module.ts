import {NgModule} from "@angular/core";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterOutlet} from "@angular/router";
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

@NgModule({
    declarations: [
        MainComponent,
        HeaderComponent,
        NavMenuComponent,
        AuthMenuComponent,
        AuthorsComponent,
        BooksComponent
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
        NzCardModule
    ],
    exports: [MainComponent]
})
export class MainModule {
}
