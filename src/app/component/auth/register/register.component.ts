import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../../../dto/auth/register-request.dto";
import {AuthService} from "../../../service/auth/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserService} from "../../../service/user.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    validateForm: UntypedFormGroup;
    private emailExists: boolean = false;
    private registrationData: RegisterRequest = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    constructor(private fb: UntypedFormBuilder,
                private authService: AuthService,
                private message: NzMessageService,
                private userService: UserService
    ) {
        this.validateForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.email, Validators.required, this.emailValidator]],
            password: ['', [Validators.required, Validators.minLength(4)]],
            confirm: ['', [Validators.required, this.confirmValidator]]
        });
    }

    submitForm = (): void => {
        if (this.validateForm.valid) {
            this.registrationData = {
                firstName: this.validateForm.value.firstName,
                lastName: this.validateForm.value.lastName,
                email: this.validateForm.value.email,
                password: this.validateForm.value.password
            };
            this.authService.register(this.registrationData).subscribe({
                next: () => {
                    this.message.success("You've been successfully registered!")
                },
                error: (error) => {
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

    validateConfirmPassword = (): void => {
        this.validateForm.controls['confirm'].updateValueAndValidity();
    }

    emailValidator = (): { [s: string]: boolean } => {
        if (this.emailExists) {
            return {error: true, duplicated: true};
        } else {
            return {};
        }
    }

    onInputBlur = () => {
        this.userService.existsUserByEmail(this.validateForm.controls["email"].value.trim()).subscribe({
            next: () => {
                this.emailExists = true;
                this.validateForm.controls['email'].updateValueAndValidity();
            },
            error: () => {
                this.emailExists = false;
                this.validateForm.controls['email'].updateValueAndValidity();
            }
        });
    }

    confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return {error: true, required: true};
        } else if (control.value !== this.validateForm.controls['password'].value) {
            return {confirm: true, error: true};
        }
        return {};
    };
}
