import DBModel from "../../../core/dbmodel";

class User extends DBModel {
    private _id: number;
    private _employeeId: string;
    private _roleId: string;
    private _branchId: number;
    private _phoneNumbersId: number;
    private _password: string;
    private _fullName: string;
    private _email: string;
    private _status: string;
    private _picturePath: string;
    private _receiveSms: boolean;
    private _updatedAt: string;
    private _statusChangeTimestamp: string;
    private _createdAt: string;

    public getTableName() {
        return "users";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get employeeId(): string {
        return this._employeeId;
    }

    set employeeId(value: string) {
        this._employeeId = value;
    }

    get roleId(): string {
        return this._roleId;
    }

    set roleId(value: string) {
        this._roleId = value;
    }

    get branchId(): number {
        return this._branchId;
    }

    set branchId(value: number) {
        this._branchId = value;
    }

    get phoneNumbersId(): number {
        return this._phoneNumbersId;
    }

    set phoneNumbersId(value: number) {
        this._phoneNumbersId = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get picturePath(): string {
        return this._picturePath;
    }

    set picturePath(value: string) {
        this._picturePath = value;
    }

    get receiveSms(): boolean {
        return this._receiveSms;
    }

    set receiveSms(value: boolean) {
        this._receiveSms = value;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    get statusChangeTimestamp(): string {
        return this._statusChangeTimestamp;
    }

    set statusChangeTimestamp(value: string) {
        this._statusChangeTimestamp = value;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }
}

export default User;