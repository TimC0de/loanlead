import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToMany from "../../../core/decorators/oneToMany";
import oneToOne from "../../../core/decorators/oneToOne";
import PhoneNumber from "../../phone_numbers/models/phone_number";
import Branch from "./branch";
import Role from "./role";

class User extends DBModel {
    @column("id")
    private _id?: number;

    @column("employee_id")
    private _employeeId?: string;

    @oneToMany(Role, "name", "role")
    @column("role_id")
    private _roleId?: string;

    @oneToMany(Branch, "id", "branch")
    @column("branch_id")
    private _branchId?: number;

    @oneToOne(PhoneNumber, "id", "phoneNumber")
    @column("phone_numbers_id")
    private _phoneNumbersId?: number;

    @column("password")
    private _password?: string;

    @column("full_name")
    private _fullName?: string;

    @column("email")
    private _email?: string;

    @column("status")
    private _status?: string;

    @column("picture_path")
    private _picturePath?: string;

    @column("receive_sms")
    private _receiveSms?: boolean;

    @column("updated_at")
    private _updatedAt?: string;

    @column("status_change_timestamp")
    private _statusChangeTimestamp?: string;

    @column("created_at")
    private _createdAt?: string;

    private _phoneNumber?: PhoneNumber;
    private _role?: Role;
    private _branch?: Branch;

    public static columns: { [key: string]: any } = {
        rowModel: { },
        modelRow: { },
    };

    public static relations: Array<{
        relation: string,
        dbModel: new <T extends DBModel>(model: { [key: string]: any }) => T,
        targetColumn: string,
        dbModelColumn: string,
        relatedModelField: string,
    }> = [];

    public constructor(model: { [key: string]: any }) {
        super();

        this.id = model.id;
        this.employeeId = model.employeeId;
        this.roleId = model.roleId;
        this.branchId = model.branchId;
        this.phoneNumbersId = model.phoneNumbersId;
        this.password = model.password;
        this.fullName = model.fullName;
        this.email = model.email;
        this.status = model.status;
        this.picturePath = model.picturePath;
        this.receiveSms = model.receiveSms;
        this.updatedAt = model.updatedAt;
        this.statusChangeTimestamp = model.statusChangeTimestamp;
        this.createdAt = model.createdAt;
    }

    public static getTableName() {
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

    get phoneNumber(): PhoneNumber {
        return this._phoneNumber;
    }

    set phoneNumber(value: PhoneNumber) {
        this._phoneNumber = value;
    }

    get role(): Role {
        return this._role;
    }

    set role(value: Role) {
        this._role = value;
    }

    get branch(): Branch {
        return this._branch;
    }

    set branch(value: Branch) {
        this._branch = value;
    }
}

export default User;