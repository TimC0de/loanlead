import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BranchService} from '../bank/branch/branch.service';
import {RoleService} from '../bank/role/role.service';
import Branch from '../bank/branch/branch.model';
import Role from '../bank/role/role.model';
import {UserService} from '../bank/user/user.service';
import {PhoneNumberService} from '../phone-number/phone-number.service';
import User from '../bank/user/user.model';
import PhoneNumber from '../phone-number/phone-number.model';
import {Router} from '@angular/router';
import {setInputDefaults, textInputEventHandler, textSelectEventHandler} from '../../common/scripts/text-input-control';

const toSnakeCase = (s: string): string => {
    return s.replace(/[A-Z]/g, (c: string) => `_${c.toLowerCase()}`);
};

const toSpaceBetween = (s: string): string => {
    return s.replace(/[A-Z]/g, (c: string) => ` ${c.toLowerCase()}`);
};

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    // form group objects
    mainInformationForm: FormGroup;
    phoneNumbersForm: FormGroup;
    jobDetailsForm: FormGroup;
    userPictureForm: FormGroup;

    branches: Branch[] = [];
    roles: Role[] = [];
    branchesDisplayName: string[] = [];
    rolesDisplayName: string[] = [];
    uploadedUserPicture: File;

    constructor(
        private fb: FormBuilder,
        private branchService: BranchService,
        private roleService: RoleService,
        private userService: UserService,
        private phoneNumberService: PhoneNumberService,
        private router: Router,
    ) {
        branchService.findAll()
            .subscribe((data: Branch[]) => {
                this.branches = data;
            });

        roleService.findAll()
            .subscribe((data: Role[]) => {
                this.roles = data;
            });
    }

    ngOnInit() {
        document.title = 'Sign Up';

        const sections = document.querySelectorAll('section');

        sections.forEach((section, index) => {
            section.style.left = `${index * 150}%`;
        });

        const previousButton = document.querySelector('.previous');

        previousButton.setAttribute('hidden', '');

        // Main Information Form Group Init
        this.mainInformationForm = this.fb.group({
            employeeId: [''],
            password: [
                '',
                [
                    Validators.minLength(8),
                    Validators.pattern(/[A-Z]+/),
                    Validators.pattern(/[a-z]+/),
                    Validators.pattern(/[0-9]+/),
                ]
            ],
            fullName: [''],
            email: ['', Validators.email],
        }, {
            validators: Validators.required
        });

        // Phone Numbers Form Group Init
        this.phoneNumbersForm = this.fb.group({
            firstPhoneNumber: [''],
            secondPhoneNumber: [''],
        }, {
            validators: [
                Validators.required,
                Validators.minLength(9),
                Validators.maxLength(10),
            ]
        });

        // Job Details Form Group Init
        this.jobDetailsForm = this.fb.group({
            role: [''],
            branch: [''],
        }, {
            validators: Validators.required
        });

        // User Picture Form Group Init
        this.userPictureForm = this.fb.group({
            userPicture: [''],
        });

        // input animations
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

    next() {
        const currentStepIndex = this.getCurrentStepIndex();
        const form = document
            .querySelector(`form#${
                currentStepIndex === 0
                    ? 'mainInformationForm'
                    : 'jobDetailsForm'
                }`);

        if (!form.classList.contains('validated')) {
            form.classList.add('validated');

            document
                .querySelectorAll(`form#${
                    currentStepIndex === 0
                        ? 'mainInformationForm'
                        : 'jobDetailsForm'
                    } [data-unique]`
                )
                .forEach((fieldElement) => {
                    this.isUnique(fieldElement.getAttribute('id'));
                });

            Object.keys(this.phoneNumbersForm.controls).forEach((controlName) => {
                this.isUniquePhoneNumber(controlName);
            });
        }

        if (this.validate() && !document.querySelector('.step:last-child').classList.contains('current')) {
            const previousButton = document.querySelector('.previous');
            const nextButton = document.querySelector('.next');

            if (previousButton.hasAttribute('hidden')) {
                previousButton.removeAttribute('hidden');
            }

            const sections = document.querySelectorAll('section');
            const steps = document.querySelectorAll('.step');
            let moved = false;

            if (previousButton.hasAttribute('hidden')) {
                previousButton.removeAttribute('hidden');
            }

            steps.forEach((step, index) => {
                if (!moved && step.classList.contains('current')) {
                    steps[index].classList.remove('current');
                    steps[index].classList.add('passed');
                    steps[index + 1].classList.add('current');

                    moved = true;
                }
            });

            if (document.querySelector('.step.current:last-child')) {
                nextButton.setAttribute('hidden', '');
            }

            sections.forEach((section) => {
                section.style.left = `${parseInt(section.style.left, 10) - 150}%`;
            });
        }
    }

    previous() {
        if (!document.querySelector('.step:first-child').classList.contains('current')) {
            const previousButton = document.querySelector('.previous');
            const nextButton = document.querySelector('.next');

            if (nextButton.hasAttribute('hidden')) {
                nextButton.removeAttribute('hidden');
            }

            const sections = document.querySelectorAll('section');
            const steps = document.querySelectorAll('.step');
            let moved = false;

            steps.forEach((step, index) => {
                if (!moved && step.classList.contains('current')) {
                    steps[index].classList.remove('current');
                    steps[index - 1].classList.add('current');

                    moved = true;
                }
            });

            if (document.querySelector('.step.current:first-child')) {
                previousButton.setAttribute('hidden', '');
            }

            sections.forEach((section) => {
                section.style.left = `${parseInt(section.style.left, 10) + 150}%`;
            });
        }
    }

    isUnique(field: string) {
        const currentStepIndex = this.getCurrentStepIndex();
        const group: FormGroup = this[
            currentStepIndex === 0
                ? 'mainInformationForm'
                : 'jobDetailsForm'
            ];

        const control: FormControl = group.get(field) as FormControl;
        const form = document
            .querySelector(`form#${
                currentStepIndex === 0
                    ? 'mainInformationForm'
                    : 'jobDetailsForm'
                }`);

        if (!control.errors && control.value) {
            this.userService.isUnique(toSnakeCase(field), control.value)
                .subscribe((data: { notUnique: boolean } | null) => {
                    if (form.classList.contains('validated')) {
                        const input = document.getElementById(field);
                        const labelSpan = document
                            .querySelector(`label[for="${field}"] > .feedback`);

                        input.classList[data ? 'add' : 'remove']('invalid');
                        labelSpan.textContent = data ? `Please, provide unique ${toSpaceBetween(field)}` : '';
                    }

                    if (data) {
                        if (control.errors) {
                            control.errors.notUnique = true;
                        } else {
                            control.setErrors(data);
                        }
                    } else {
                        if (control.errors) {
                            delete control.errors.notUnique;
                        }
                    }
                });
        }
    }

    validate(): boolean {
        const currentStepIndex: number = this.getCurrentStepIndex();
        const formGroup = this[
            currentStepIndex === 0
                ? 'mainInformationForm'
                : 'jobDetailsForm'
            ];

        const form = document
            .querySelector(`form#${
                currentStepIndex === 0
                    ? 'mainInformationForm'
                    : 'jobDetailsForm'
                }`);

        let valid = true;

        if (form.classList.contains('validated')) {
            const controls = formGroup.controls;

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

        return this.validatePhoneNumbers() && valid;
    }

    validatePhoneNumbers(): boolean {
        let result = true;
        const form = document.querySelector('form#mainInformationForm');
        const controls = this.phoneNumbersForm.controls;

        Object.keys(controls).forEach((controlName) => {
            controls[controlName].setValue(controls[controlName].value.replace(/[^0-9]*/g, ''));
        });

        if (form.classList.contains('validated')) {
            Object.keys(controls).forEach((controlName) => {
                const input = document.getElementById(controlName);
                const labelSpan = document.querySelector(`label[for="${controlName}"] > .feedback`);
                const control: FormControl = controls[controlName] as FormControl;

                input.classList[control.errors ? 'add' : 'remove']('invalid');
                let textContent = '';

                if (control.errors) {
                    result = false;

                    Object.keys(control.errors).forEach((error) => {
                        switch (error) {
                            case 'required':
                                textContent = 'Please, enter this field';

                                break;
                            case 'minlength':
                                textContent = 'Please, enter more symbols';

                                break;
                            case 'maxlength':
                                textContent = 'Please, enter less symbols';

                                break;
                            case 'notUnique':
                                textContent = 'This phone already exists';

                                break;
                            case 'pattern':
                                textContent = 'Phone number must have only digits';

                                break;
                            default:
                                textContent = '';

                                break;
                        }
                    });
                }

                labelSpan.textContent = textContent;
            });
        }

        return result;
    }

    isUniquePhoneNumber(phoneNumberType: string) {
        const control: FormControl = this.phoneNumbersForm.get(phoneNumberType) as FormControl;
        const form = document.querySelector('form#mainInformationForm');

        if (!control.errors && control.value) {
            this.phoneNumberService.isUnique(control.value)
                .subscribe((data: { notUnique: boolean } | null) => {
                    if (form.classList.contains('validated')) {
                        const input = document.getElementById(phoneNumberType);
                        const labelSpan = document.querySelector(`label[for="${phoneNumberType}"] > .feedback`);

                        input.classList[data ? 'add' : 'remove']('invalid');
                        labelSpan.textContent = data ? 'This phone already exists' : '';
                    }

                    if (data) {
                        if (control.errors) {
                            control.errors.notUnique = true;
                        } else {
                            control.setErrors(data);
                        }
                    } else {
                        if (control.errors) {
                            delete control.errors.notUnique;
                        }
                    }
                });
        }
    }

    getCurrentStepIndex(): number {
        let result = 0;

        document.querySelectorAll('.step').forEach((step, index) => {
            if (step.classList.contains('current')) {
                result = index;
            }
        });

        return result;
    }

    autocompleteInputField(event: any) {
        const inputId = event.target.getAttribute('id');
        const control = this.jobDetailsForm.get(inputId);
        const entityType = inputId === 'branch' ? 'branches' : 'roles';
        const autocompleteInput = document
            .querySelector(`#${inputId} + .autocomplete-input`);

        if (event.code === 'ArrowDown') {
            const nextValueIndex =
                this[`${entityType}DisplayName`]
                    .indexOf(autocompleteInput.getAttribute('value')) + 1;

            if (this[`${entityType}DisplayName`][nextValueIndex]) {
                autocompleteInput.setAttribute(
                    'value',
                    this[`${entityType}DisplayName`][nextValueIndex]);
            }
        } else if (event.code === 'ArrowUp') {
            const previousValueIndex =
                this[`${entityType}DisplayName`]
                    .indexOf(autocompleteInput.getAttribute('value')) - 1;

            if (this[`${entityType}DisplayName`][previousValueIndex]) {
                autocompleteInput.setAttribute(
                    'value',
                    this[`${entityType}DisplayName`][previousValueIndex]);
            }
        } else if (event.code === 'ArrowRight' || event.code === 'Enter') {
            event.target.value =
                autocompleteInput.getAttribute('value');

            this[`${entityType}DisplayName`] = [event.target.value];
            control.setValue(event.target.value);
        } else if (event.code === 'Tab') {
            if (event.target.hasAttribute('data-last')) {
                event.preventDefault();
            }
        } else {
            this[`${entityType}DisplayName`] =
                control.value
                    ? this.getDisplayNames(entityType, control.value)
                    : [];

            autocompleteInput.setAttribute(
                'value',
                this[`${entityType}DisplayName`].length
                    ? this[`${entityType}DisplayName`][0]
                    : ''
            );

            this.validate();
        }
    }

    completeField(event: any) {
        const inputId = event.target.getAttribute('id');
        const entityType = inputId === 'branch' ? 'branches' : 'roles';
        const control = this.jobDetailsForm.get(inputId);
        const autocompleteInput = event.target.nextElementSibling;

        event.target.value =
            autocompleteInput.getAttribute('value');

        this[`${entityType}DisplayName`] = [ event.target.value ];
        control.setValue(event.target.value);
    }

    handlePictureInput(event: any) {
        const files: FileList = event.target.files;

        if (files && files.length && files[0].type.indexOf('image') > -1) {
            const reader = new FileReader();

            reader.onload = () => {
                document.getElementById('selectedPicture')
                    .setAttribute(
                        'src',
                        reader.result.toString());
            };

            reader.readAsDataURL(files[0]);
            this.uploadedUserPicture = files[0];
        }
    }

    prevent(event: any) {
        if (event.code === 'Tab') {
            event.preventDefault();
        }
    }

    submit() {
        const phoneNumber: PhoneNumber = {
            _firstPhoneNumber: this.phoneNumbersForm.get('firstPhoneNumber').value,
            _secondPhoneNumber: this.phoneNumbersForm.get('secondPhoneNumber').value,
        };

        this.phoneNumberService.add(phoneNumber)
            .subscribe((insertedPhoneNumbers: PhoneNumber[]) => {
                const insertedPhoneNumber = insertedPhoneNumbers.pop();
                const branchIndex = this.branches
                    .map((branch) => `${branch._name}, ${branch._entityName}`)
                    .indexOf(this.jobDetailsForm.get('branch').value);

                const roleIndex = this.roles
                    .map((role) => role._displayName)
                    .indexOf(this.jobDetailsForm.get('role').value);

                const user: User = {
                    _employeeId: this.mainInformationForm.get('employeeId').value,
                    _password: this.mainInformationForm.get('password').value,
                    _fullName: this.mainInformationForm.get('fullName').value,
                    _email: this.mainInformationForm.get('email').value,
                    _roleName: this.roles[roleIndex]._name,
                    _branchName: this.branches[branchIndex]._name,
                    _phoneNumbersId: insertedPhoneNumber._id
                };

                const formData = new FormData();

                Object.keys(user).forEach((key) => {
                    formData.append(key, user[key]);
                });

                formData.append(
                    '_picturePath',
                    this.uploadedUserPicture
                        ? this.uploadedUserPicture
                        : 'assets/images/default_picture.png');

                this.userService.signUp(formData)
                    .subscribe(
                        (data) => {
                            document.querySelector('.info-div.success')
                                .classList.add('active');

                            setTimeout(() => {
                                this.router.navigate([ '/login' ]);
                            }, 2000);
                        },
                        (reason) => {
                            const errorInfoDiv = document.querySelector('.info-div.error');

                            errorInfoDiv.classList.add('active');

                            setTimeout(() => {
                                errorInfoDiv.classList.remove('active');
                            }, 3500);
                        });
            });
    }

    private getDisplayNames(entityType: string, inputValue: string) {
        return this[entityType]
            .map((entity) => {
                return entityType === 'branches'
                        ? `${entity._name}, ${entity._entityName}`
                        : entity._displayName;
                }
            )
            .filter((entitiesDisplayName) =>
                entitiesDisplayName.startsWith(inputValue)
            )
            .sort();
    }
}
