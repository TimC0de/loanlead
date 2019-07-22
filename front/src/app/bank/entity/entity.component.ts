import {Component, OnInit} from '@angular/core';
import {EntityService} from './entity.service';
import Entity from './entity.model';
import {FormControl, Validators} from '@angular/forms';
import {
    setInputDefaults,
    textInputEventHandler,
    textSelectEventHandler
} from '../../../common/scripts/text-input-control';

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
    searchValue: FormControl = new FormControl('');
    itemsCount: FormControl = new FormControl(
        5,
        [
            Validators.required,
            Validators.min(5),
            Validators.max(20),
        ]);

    countChanged = false;

    entities: Entity[] = [];
    entitiesCount: number;
    entityToDeleteId: number;

    constructor(
        private entityService: EntityService,
    ) {
        this.entityService.findAll(1, 5)
            .subscribe((data) => {
                this.entities = data;
            });
    }

    ngOnInit() {
        document.title = 'Entities';

        this.findEntities(1);

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

            this.findEntities(page);

            this.countChanged = false;
        }
    }

    findEntities(page: number) {
        this.entityService.findCount()
            .subscribe((data: number) => {
                this.entitiesCount = data;
            });

        this.entityService.findAll(page, this.itemsCount.value)
            .subscribe((data: Entity[]) => {
                this.entities = data;
            });
    }

    setEntityToDeleteId(entityId) {
        this.entityToDeleteId = entityId;
    }

    deleteEntity() {
        this.entityService.delete(this.entityToDeleteId)
            .subscribe((queryLog: { deletedRowsNumber: number }) => {
                if (queryLog.deletedRowsNumber) {
                    const indexOfEntityToDelete: number = this.entities
                        .map((entity) => entity._id)
                        .indexOf(this.entityToDeleteId);

                    this.entities
                        .splice(indexOfEntityToDelete, 1);
                }
            });
    }

    pagesCount() {
        return Math.floor(this.entitiesCount / this.itemsCount.value) + 1;
    }
}
