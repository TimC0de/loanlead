import {Component, Input, OnInit} from '@angular/core';
import {EntityService} from '../entity.service';
import Entity from '../entity.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    setInputDefaults,
    textInputEventHandler,
    textSelectEventHandler
} from '../../../../common/scripts/text-input-control';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';

const toSpaceBetween = (s: string): string => {
    return s.replace(
        /[A-Z]/g,
        (c: string) => ` ${c.toLowerCase()}`
    );
};

@Component({
    selector: 'app-entity-form',
    templateUrl: './entity-form.component.html',
    styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
    entityId: number;
    entity: Entity;
    formGroup: FormGroup;

    constructor(
        private entityService: EntityService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        document.title = 'Entity Form';

        this.formGroup = this.fb.group({
            name: [''],
            shortName: [''],
            boxNumber: [''],
            plotNumber: [''],
            branchesNumber: [''],
            description: [''],
        }, {
            validators: Validators.required
        });

        this.activatedRoute.paramMap
            .subscribe((paramMap: ParamMap) => {
                this.entityId = parseInt(paramMap.get('entityId'), 10);

                this.entityService.findById(this.entityId)
                    .subscribe((data: Entity[]) => {
                        if (data.length) {
                            const entity = data.pop();

                            this.formGroup.patchValue({
                                name:  entity._name,
                                shortName:  entity._shortName,
                                boxNumber:  entity._boxNumber,
                                plotNumber:  entity._plotNumber,
                                branchesNumber:  entity._branchesNumber,
                                description:  entity._description,
                            });
                        }
                    });
            });

        // input animations
        document
            .querySelectorAll('.text-input-control .text-input')
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
        let result = true;
        const controls = this.formGroup.controls;

        if (controls.branchesNumber.value) {
            controls.branchesNumber.setValue(
                controls.branchesNumber.value.toString()
                    .replace(/[^0-9]/g, '')
            );
        }

        Object.keys(controls).forEach((controlName) => {
            result = this.validateFormControl(controlName);
        });

        return result;
    }

    isUnique(fieldType: string): boolean {
        let result = true;
        const control = this.formGroup.get(fieldType);
        const form = document.querySelector('form');

        if (!control.errors && control.value) {
            this.entityService.isUnique(fieldType, control.value)
                .subscribe((data: { notUnique: boolean} | null) => {
                    if (data) {
                        if (control.errors) {
                            control.errors.notUnique = data.notUnique;
                        } else {
                            control.setErrors(data);
                        }
                    } else {
                        if (control.errors) {
                            delete control.errors.notUnique;
                        }
                    }

                    if (form.classList.contains('validated') || this.entityId) {
                        result = this.validateFormControl(fieldType);
                    }
                });
        }

        return result;
    }

    submit() {
        const form = document.querySelector('form');

        if (!form.classList.contains('validated')) {
            form.classList.add('validated');

            this.isUnique('name');
        }

        if (this.validate()) {
            const entity: Entity = {
                _name: this.formGroup.get('name').value,
                _shortName: this.formGroup.get('shortName').value,
                _boxNumber: this.formGroup.get('boxNumber').value,
                _plotNumber: this.formGroup.get('plotNumber').value,
                _branchesNumber: this.formGroup.get('branchesNumber').value,
                _description: this.formGroup.get('description').value,
            };

            const observable: Observable<any> = this.entityId
                ? this.entityService.update(entity, this.entityId)
                : this.entityService.add(entity);

            observable
                .subscribe((data: Entity | null) => {
                    const successInfoDiv = document.querySelector('.info-div.success');

                    successInfoDiv.classList.add('active');
                    successInfoDiv.lastElementChild.textContent =
                        `Entity was successfully ${this.entityId ? 'updated' : 'created'}`;

                    setTimeout(() => {
                        successInfoDiv.classList.remove('active');

                        this.router.navigate(['/admin/entities']);
                    }, 2000);
                }, () => {
                    const errorsInfoDiv = document.querySelector('.info-div.error');
                    errorsInfoDiv.classList.add('active');

                    setTimeout(() => {
                        errorsInfoDiv.classList.remove('active');
                    }, 3500);
                });
        }
    }

    validateFormControl(controlName: string): boolean {
        let result = true;
        const control = this.formGroup.get(controlName);
        const input = document.getElementById(controlName);
        const labelSpan = document
            .querySelector(`label[for="${controlName}"] > .feedback`);

        input.classList[control.errors ? 'add' : 'remove']('invalid');
        let textContent = '';

        if (control.errors) {
            result = false;

            Object.keys(control.errors).forEach((error) => {
                switch (error) {
                    case 'required':
                        textContent = 'Please, enter this field';
                        break;
                    case 'notUnique':
                        textContent = `This ${toSpaceBetween(controlName)} already exists`;
                        break;
                    default:
                        textContent = '';
                        break;
                }
            });
        }

        labelSpan.textContent = textContent;

        return result;
    }
}
