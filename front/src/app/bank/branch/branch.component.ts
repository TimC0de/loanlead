import {Component, OnInit} from '@angular/core';
import {BranchService} from './branch.service';
import Branch from './branch.model';
import {FormControl, Validators} from '@angular/forms';
import {
    setInputDefaults,
    textInputEventHandler,
    textSelectEventHandler
} from '../../../common/scripts/text-input-control';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
    searchValue: FormControl = new FormControl('');
    itemsCount: FormControl = new FormControl(
        5,
        [
            Validators.required,
            Validators.min(5),
            Validators.max(20),
        ]);

    countChanged = false;

    branches: Branch[] = [];
    branchesCount: number;
    branchToDeleteId: number;

    constructor(
        private branchService: BranchService,
    ) {
        this.branchService.findCount()
            .subscribe((data: Array<{ count: number }>) => {
                this.branchesCount = data[0].count;
            });

        this.findBranches(1);
    }

    ngOnInit() {
        document.title = 'Branches';

        this.findBranches(1);

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

        this.countChanged = true;
    }

    filter() {
        if (!this.itemsCount.errors && this.countChanged) {
            const page = 1;

            this.findBranches(page);

            this.countChanged = false;
        }
    }

    findBranches(page: number) {
        this.branchService.findAll(page, this.itemsCount.value)
            .subscribe((data: Branch[]) => {
                this.branches = data;
            });
    }

    setBranchToDeleteId(branchId) {
        this.branchToDeleteId = branchId;
    }

    deleteBranch() {
        this.branchService.delete(this.branchToDeleteId)
            .subscribe((queryLog: { deletedRowsNumber: number }) => {
                if (queryLog.deletedRowsNumber) {
                    const indexOfBranchToDelete: number = this.branches
                        .map((branch) => branch._id)
                        .indexOf(this.branchToDeleteId);

                    this.branches
                        .splice(indexOfBranchToDelete, 1);
                }
            });
    }

    pageChanged(newPageNumber: number) {
        this.findBranches(newPageNumber);
    }

    pagesCount() {
        return Math.floor(this.branchesCount / this.itemsCount.value) + 1;
    }
}
