import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import User from '../user/user.model';
import {UserService} from '../user/user.service';
import {
    setInputDefaults,
    textInputEventHandler,
    textSelectEventHandler
} from '../../../common/scripts/text-input-control';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    @Input() type: string;
    @Input() count: number;

    searchValue: FormControl;
    itemsCount: FormControl;
    countChanged = false;

    usersCount: number;
    users: User[] = [];

    constructor(
        private userService: UserService,
    ) {}

    ngOnInit() {
        this.searchValue = new FormControl('');
        this.itemsCount = new FormControl(
            '',
            [
                Validators.required,
                Validators.min(5),
                Validators.max(20)
        ]);

        this.itemsCount.setValue(this.count);
        this.findUsers(1);

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

    formatDate(date: Date) {
        date = new Date(date);

        const month = date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;

        const day = date.getDate() > 9
            ? date.getDate()
            : `0${date.getDate()}`;

        const hours = date.getHours() > 9
            ? date.getHours()
            : `0${date.getHours()}`;

        const minutes = date.getMinutes() > 9
            ? date.getMinutes()
            : `0${date.getMinutes()}`;

        const seconds = date.getSeconds() > 9
            ? date.getSeconds()
            : `0${date.getSeconds()}`;

        return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    validate() {
        const input = document.getElementById('itemsCount');
        const labelSpan = document.querySelector('label[for="itemsCount"] > .feedback');

        input.classList[this.itemsCount.errors ? 'add' : 'remove']('invalid');
        let textContent = '';

        if (this.itemsCount.errors) {
            Object.keys(this.itemsCount.errors).forEach((error) => {
                switch (error) {
                    case 'required':
                        textContent = 'Please, enter this field';

                        break;
                    case 'min':
                        textContent = 'Please, enter higher number';

                        break;
                    case 'max':
                        textContent = 'Please, enter lower number';

                        break;
                    default:
                        textContent = '';

                        break;
                }
            });
        }

        labelSpan.textContent = textContent;

        this.count = this.itemsCount.value;
        this.countChanged = true;
    }

    filter() {
        if (!this.itemsCount.errors && this.countChanged) {
            const page = 1;

            this.findUsers(page);

            this.countChanged = false;
        }
    }

    findUsers(page: number) {
        this.userService.findTypeCount(this.type)
            .subscribe((data: number) => {
                this.usersCount = data;
            });

        this.userService.findType(this.type, page, this.count)
            .subscribe((data: User[]) => {
                this.users = data;
            });
    }
}
