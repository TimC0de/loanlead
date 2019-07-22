import {Component, OnInit} from '@angular/core';
import {RoleService} from './role.service';
import Role from './role.model';
import {FormControl, Validators} from '@angular/forms';
import {setInputDefaults, textInputEventHandler, textSelectEventHandler} from '../../../common/scripts/text-input-control';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
    itemsCount: FormControl;
    searchValue: FormControl;
    countChanged: boolean;
    
    roles: Role[] = [];
    rolesCount: number;

    constructor(
        private roleService: RoleService,
    ) {
        this.searchValue = new FormControl('');
        this.itemsCount = new FormControl(5, [
            Validators.required,
            Validators.max(15),
            Validators.min(5),
        ]);

        this.roleService.findCount()
            .subscribe((data: Array<{ count: number }>) => {
                this.rolesCount = data[0].count;
            });

        this.findRoles(1);
    }

    ngOnInit() {
        document.title = 'Roles';

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

        this.countChanged = true;
    }

    filter() {
        if (!this.itemsCount.errors && this.countChanged) {
            const page = 1;

            this.findRoles(page);

            this.countChanged = false;
        }
    }
    
    findRoles(page: number) {
        this.roleService.findAll(page, this.itemsCount.value)
            .subscribe((data: Role[]) => {
                this.roles = data;
            });
    }
    
    setSendSMS(enableSendingSMS: boolean, id: number) {
        this.roleService.updateSendSMS(enableSendingSMS, id)
            .subscribe((data) => {
                const roleIndex = this.roles
                    .map((role) => role._id)
                    .indexOf(id);

                this.roles[roleIndex] = data.pop();
            });
    }
    
    pagesCount() {
        return Math.floor(this.rolesCount / this.itemsCount.value) + 1;
    }
    
    pageChanged(newPageNumber: number) {
        this.findRoles(newPageNumber);
    }
}
