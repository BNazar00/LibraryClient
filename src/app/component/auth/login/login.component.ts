import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth/auth.service";
import {AuthenticationRequest} from "../../../dto/auth/authentication-request.dto";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    validateForm: UntypedFormGroup;

    private illegalLoginData: boolean = false;
    private authenticationData: AuthenticationRequest = {
        email: '',
        password: ''
    };

    constructor(private fb: UntypedFormBuilder,
                private authService: AuthService,
                private router: Router,
                private message: NzMessageService) {
        this.validateForm = this.fb.group({
            email: ['test@gmail.com', [Validators.email, Validators.required, this.loginDataValidator]],
            password: ['test', [Validators.required, Validators.minLength(4), this.loginDataValidator]]
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            this.authenticationData = {
                email: this.validateForm.value.email,
                password: this.validateForm.value.password
            };
            this.authService.login(this.authenticationData).subscribe({
                next: () => {
                    this.message.success("You've been successfully logged in!");
                    this.router.navigate(['']);
                },
                error: (error) => {
                    if (error.status === 403) {
                        this.illegalLoginData = true;
                        this.validateForm.controls['email'].updateValueAndValidity()
                        this.validateForm.controls['password'].updateValueAndValidity()
                        return;
                    }
                    this.message.error("HTTP request failed: ", error);
                }
            });
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }

    resetLoginDataValidator = (): void => {
        this.illegalLoginData = false;
        this.validateForm.controls['email'].updateValueAndValidity()
        this.validateForm.controls['password'].updateValueAndValidity()
    }

    private loginDataValidator = (): { [s: string]: boolean } => {
        if (this.illegalLoginData) {
            return {illegal: true, error: true};
        }
        return {};
    };
}
