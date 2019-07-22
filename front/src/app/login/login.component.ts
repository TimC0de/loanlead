import {Component, OnInit} from '@angular/core';
import {UserService} from '../bank/user/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import User from '../bank/user/user.model';
import {Router} from '@angular/router';
import { setInputDefaults, textSelectEventHandler, textInputEventHandler } from '../../common/scripts/text-input-control';

@Component({
    selector: 'app-log-in',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form = this.fb.group({
        employeeId: ['', Validators.required],
        password: ['', Validators.required],
    });

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private router: Router,
    ) {

    }

    ngOnInit() {
        document.title = 'Login';

        document
            .querySelectorAll('.text-input-control input')
            .forEach((textInput) => {
                textInput.addEventListener('focus', textInputEventHandler('focus'));
                textInput.addEventListener('blur', textInputEventHandler('blur'));

                setInputDefaults(textInput);
            });

        document.querySelectorAll('.text-select-control .main-input')
            .forEach((textSelect) => {
                textSelect.addEventListener(
                    'focus',
                    textSelectEventHandler('focus'));

                textSelect.addEventListener(
                    'blur',
                    textSelectEventHandler('blur'));

                setInputDefaults(textSelect);
            });
    }

    validate() {
        const form = document.querySelector('form');

        if (form.classList.contains('validated')) {
            const controls = this.form.controls;

            Object.keys(controls).forEach((field) => {
                const input = document.getElementById(field);
                const labelSpan = document
                    .querySelector(`label[for="${field}"] > .feedback`);

                input.classList[controls[field].errors ? 'add' : 'remove']('invalid');
                let labelContent = '';

                Object.keys(controls[field].errors).forEach((error) => {
                    switch (error) {
                        case 'required':
                            labelContent = 'Please, enter this field';

                            break;
                        case 'email':
                            labelContent = 'Please, enter a valid email';

                            break;
                        case 'minlength':
                            labelContent = 'Please, enter more symbols';

                            break;
                        case 'maxlength':
                            labelContent = 'Please, enter less symbols';

                            break;
                        default:
                            labelContent = '';

                            break;
                    }
                });

                labelSpan.textContent = labelContent;
            });
        }
    }

    submit() {
        if (this.form.invalid) {
            const form = document.querySelector('form');

            if (!form.classList.contains('validated')) {
                form.classList.add('validated');
            }

            this.validate();
        }

        this.userService.login(this.form.value)
            .subscribe((data) => {
                if (!data._id) {
                    const errorInfoDiv = document.querySelector('.info-div.error');

                    errorInfoDiv.textContent = data.message;
                    errorInfoDiv.classList.add('active');

                    setTimeout(() => {
                        errorInfoDiv.classList.remove('active');
                    }, 3500);
                } else {
                    localStorage.setItem('current_user', JSON.stringify(data));

                    this.router.navigate([
                        `${
                            data._role._displayName === 'Administrator'
                                ? '/admin'
                                : ''
                        }/home`]);
                }
            });
    }
}
