import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Branch from '../branch.model';
import Entity from '../../entity/entity.model';
import {BranchService} from '../branch.service';
import {EntityService} from '../../entity/entity.service';
import {setInputDefaults, textInputEventHandler, textSelectEventHandler} from '../../../../common/scripts/text-input-control';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

const toSpaceBetween = (s: string): string => {
    return s.replace(
        /[A-Z]/g,
        (c: string) => ` ${c.toLowerCase()}`
    );
};

@Component({
    selector: 'app-branch-form',
    templateUrl: './branch-form.component.html',
    styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {
    @Input() branchId: number;

    formGroup: FormGroup;
    branch: Branch;

    entitiesDisplayName: string[];
    entities: Entity[];

    constructor(
        private branchService: BranchService,
        private entityService: EntityService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        document.title = 'Branch Form';

        this.entityService.findAll()
            .subscribe((data: Entity[]) => {
                this.entities = data;
            });

        this.formGroup = this.fb.group({
            name      : [''],
            entityName: [''],
            type      : [''],
            district  : [''],
            town      : [''],
        }, {
            validators: Validators.required
        });

        this.activatedRoute.paramMap
            .subscribe((paramMap: ParamMap) => {
                this.branchId = parseInt(paramMap.get('branchId'), 10);

                if (this.branchId) {
                    this.branchService.findById(this.branchId)
                        .subscribe((data: Branch[]) => {
                            if (data.length) {
                                const branch = data.pop();

                                this.formGroup.patchValue({
                                    name      : branch._name,
                                    entityName: branch._entityName,
                                    type      : branch._type,
                                    district  : branch._district,
                                    town      : branch._town,
                                });
                            }
                        });
                }
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

    validate(): boolean {
        const branchFormGroup = this.formGroup;
        const form = document.querySelector('form');

        let valid = true;

        if (form.classList.contains('validated') || this.branchId) {
            const controls = branchFormGroup.controls;

            Object.keys(controls).forEach((field) => {
                const control = controls[field];
                const input = document.getElementById(field);
                const labelSpan = document
                    .querySelector(`label[for="${field}"] > .feedback`);

                input.classList[control.errors ? 'add' : 'remove']('invalid');
                let labelContent = '';

                if (control.errors) {
                    valid = false;

                    Object.keys(control.errors).forEach((error) => {
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
                            case 'notUnique':
                                labelContent = `This ${toSpaceBetween(field)} already exists`;

                                break;
                            case 'pattern':
                                if (!control.value.match(/[0-9]+/)) {
                                    labelContent = 'Digits required';
                                } else if (!control.value.match(/[A-Z]+/)) {
                                    labelContent = 'Uppercase characters required';
                                } else {
                                    labelContent = 'Lowercase characters required';
                                }

                                break;
                            default:
                                labelContent = '';

                                break;
                        }
                    });
                }

                labelSpan.textContent = labelContent;
            });
        }

        return valid;
    }

    isUnique(fieldName: string) {

    }

    autocompleteInputField(event: any) {
        const inputId = event.target.getAttribute('id');
        const control = this.formGroup.get(inputId);
        const autocompleteInput = document
            .querySelector(`#${inputId} + .autocomplete-input`);

        switch (event.code) {
            case 'ArrowUp':
            case 'ArrowDown':
                const nextValueIndex = this.entitiesDisplayName
                    .indexOf(autocompleteInput.getAttribute('value')) + (event.code === 'ArrowUp' ? -1 : 1);

                if (this.entitiesDisplayName[nextValueIndex]) {
                    autocompleteInput
                        .setAttribute('value', this.entitiesDisplayName[nextValueIndex]);
                }

                break;
            case 'ArrowRight':
            case 'Enter':
                this.completeField(event);

                break;
            default:
                this.entitiesDisplayName = control.value ? this.getDisplayNames(control.value) : [];

                autocompleteInput
                    .setAttribute(
                        'value',
                        this.entitiesDisplayName.length ? this.entitiesDisplayName[0] : ''
                    );

                this.validate();

                break;
        }
    }

    completeField(event: any) {
        const autocompleteInput = event.target.nextElementSibling;

        event.target.value = autocompleteInput.getAttribute('value');

        this.entitiesDisplayName = Array.from(event.target.value);
        this.formGroup
            .controls[event.target.getAttribute('id')]
            .setValue(event.target.value);
    }

    private getDisplayNames(inputValue: string) {
        return this.entities
            .map((entity) => entity._name)
            .filter((entitiesDisplayName) =>
                entitiesDisplayName.startsWith(inputValue)
            )
            .sort();
    }

    submit() {
        const form = document.querySelector('form');

        if (!form.classList.contains('validated')) {
            form.classList.add('validated');

            this.isUnique('name');
        }

        if (this.validate()) {
            const entityIndex = this.entities
                .map((entity) => entity._name)
                .indexOf(this.formGroup.get('entityName').value);

            const branch: Branch = {
                _name: this.formGroup.get('name').value,
                _entityName: this.entities[entityIndex]._name,
                _type: this.formGroup.get('type').value,
                _district: this.formGroup.get('district').value,
                _town: this.formGroup.get('town').value,
            };

            const observable: Observable<any> = this.branchId
                ? this.branchService.update(branch, this.branchId)
                : this.branchService.add(branch);

            observable
                .subscribe((data: Entity | null) => {
                    const successInfoDiv = document.querySelector('.info-div.success');

                    successInfoDiv.classList.add('active');
                    successInfoDiv.lastElementChild.textContent =
                        `Branch was successfully ${this.branchId ? 'updated' : 'created'}`;

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
}
