import {Component, OnInit} from '@angular/core';
import {TemplateService} from './template.service';
import Template from './template.model';
import {FormControl, Validators} from '@angular/forms';
import {
    setInputDefaults,
    textInputEventHandler,
    textSelectEventHandler
} from '../../../common/scripts/text-input-control';

@Component({
    selector: 'app-template',
    templateUrl: './templates.component.html',
    styleUrls: ['./templates.component.scss']
})
export class TemplateComponent implements OnInit {
    searchValue: FormControl = new FormControl('');
    itemsCount: FormControl = new FormControl(
        5,
        [
            Validators.required,
            Validators.min(5),
            Validators.max(20),
        ]);

    countChanged = false;

    templates: Template[] = [];
    templatesCount: number;
    templateToDeleteId: number;

    constructor(
        private templateService: TemplateService,
    ) {
        this.templateService.findCount()
            .subscribe((data: Array<{ count: number }>) => {
                this.templatesCount = data[0].count;
            });

        this.findTemplates(1);
    }

    ngOnInit() {
        document.title = 'Templates';

        this.findTemplates(1);

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

            this.findTemplates(page);

            this.countChanged = false;
        }
    }

    findTemplates(page: number) {
        this.templateService.findAll(page, this.itemsCount.value)
            .subscribe((data: Template[]) => {
                this.templates = data;
            });
    }

    setTemplateToDeleteId(templateId) {
        this.templateToDeleteId = templateId;
    }

    deleteTemplate() {
        this.templateService.delete(this.templateToDeleteId)
            .subscribe((queryLog: { deletedRowsNumber: number }) => {
                if (queryLog.deletedRowsNumber) {
                    const indexOfTemplateToDelete: number = this.templates
                        .map((template) => template._id)
                        .indexOf(this.templateToDeleteId);

                    this.templates
                        .splice(indexOfTemplateToDelete, 1);
                }
            });
    }

    pageChanged(newPageNumber: number) {
        this.findTemplates(newPageNumber);
    }

    pagesCount() {
        return Math.floor(this.templatesCount / this.itemsCount.value) + 1;
    }
}
