import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";
import {RegisterComponent} from './register/register.component';
import {NzMessageModule} from "ng-zorro-antd/message";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        NzFormModule,
        ReactiveFormsModule,
        NzInputModule,
        NzCheckboxModule,
        NzButtonModule,
        BrowserAnimationsModule,
        NzMessageModule
    ]
})
export class AuthModule {
}
