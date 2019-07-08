import {Component, OnInit} from '@angular/core';
import {LoginService} from './service/login.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import User from '../bank/user/user.model';

@Component({
    selector: 'app-log-in',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        employeeId: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(
        private loginService: LoginService,
        private fb: FormBuilder,
    ) {

    }

    ngOnInit() {
        document.title = 'Login';
    }

    validate() {
        const form = document.querySelector('form');

        if (form.classList.contains('validated')) {
            const controls = this.loginForm.controls;

            Object.keys(controls).forEach((field) => {
                const input = document.getElementById(field);
                const labelSpan = document
                    .querySelector(`label[for="${field}"] > .feedback`);

                if (controls[field].errors) {
                    input.classList.add('invalid');
                    labelSpan.textContent = 'Please, provide this field';
                } else {
                    input.classList.remove('invalid');
                    labelSpan.textContent = '';
                }
            });
        }
    }

    submit() {
        console.log(this.loginForm.invalid);

        if (this.loginForm.invalid) {
            const form = document.querySelector('form');

            if (!form.classList.contains('validated')) {
                form.classList.add('validated');
            }

            this.validate();
        }

        this.loginService.login(this.loginForm.value)
            .subscribe((data: User | { message: string }) => {
                if (data.hasOwnProperty('message')) {
                    const errorInfoDiv = document.querySelector('.info-div.error');

                    errorInfoDiv.classList.add('active');

                    setTimeout(() => {
                        errorInfoDiv.classList.remove('active');
                    }, 3500);
                } else {
                    localStorage.setItem('current_user', JSON.stringify(data));
                }
            });
    }
}
