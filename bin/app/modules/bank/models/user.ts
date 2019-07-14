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
    @column("role_name")
    private _roleName?: string;

    @oneToMany(Branch, "name", "branch")
    @column("branch_name")
    private _branchName?: number;

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
    private _updatedAt?: Date;

    @column("status_change_timestamp")
    private _statusChangeTimestamp?: Date;

    @column("created_at")
    private _createdAt?: Date;

    @column("newly_created")
    private _newlyCreated: boolean;

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
        this.roleName = model.roleName;
        this.branchName = model.branchName;
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

    get roleName(): string {
        return this._roleName;
    }

    set roleName(value: string) {
        this._roleName = value;
    }

    get branchName(): number {
        return this._branchName;
    }

    set branchName(value: number) {
        this._branchName = value;
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

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get statusChangeTimestamp(): Date {
        return this._statusChangeTimestamp;
    }

    set statusChangeTimestamp(value: Date) {
        this._statusChangeTimestamp = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value ? value : new Date();
    }

    get newlyCreated(): boolean {
        return this._newlyCreated;
    }

    set newlyCreated(value: boolean) {
        this._newlyCreated = value;
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