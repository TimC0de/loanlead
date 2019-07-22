import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import manyToMany from "../../../core/decorators/manyToMany";
import oneToMany from "../../../core/decorators/oneToMany";
import User from "../../bank/models/user";
import Customer from "./customer";
import LoanProduct from "./loan_product";
import SecurityType from "./security_type";

class Loan extends DBModel {
    @column("id")
    private _id?: number;

    @oneToMany(Customer, "id", "_customer")
    @column("customer_id")
    private _customerId?: number;

    @oneToMany(LoanProduct, "loan_product", "_loanProductObject")
    @column("loan_product")
    private _loanProduct?: string;

    @column("amount")
    private _amount?: number;

    @column("tenure")
    private _tenure?: number;

    @column("created_at")
    private _createdAt?: Date;

    @column("receive_timestamp")
    private _receiveTimestamp?: Date;

    @column("defer_stage")
    private _deferStage?: number;

    @column("type_changed")
    private _typeChanged?: boolean;

    @oneToMany(User, "employee_id", "user")
    @column("actioned_by")
    private _actionedBy?: string;

    @column("status")
    private _status?: string;

    @column("comment")
    private _comment?: string;

    @column("staged_at")
    private _stagedAt?: Date;

    @manyToMany(SecurityType, "security_type_id", "loan_id", "loans_security_types")
    private _securityTypes?: SecurityType[];

    private _user?: User;
    private _customer?: Customer;
    private _loanProductObject?: LoanProduct;

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

    public static manyToManyRelations: Array<{
        relatedModelClass: new <T extends DBModel>(model: { [key: string]: any }) => T,
        bridgeTableRelatedModelColumn: string,
        bridgeTableRelatedModel: string,
        bridgeTableName: string,
        relatedModel: string,
    }> = [];

    public constructor(model: { [key: string]: any }) {
        super();

        this.id = model.id;
        this.customerId = model.customerId;
        this.loanProduct = model.loanProduct;
        this.amount = model.amount;
        this.tenure = model.tenure;
        this.createdAt = model.createdAt;
        this.receiveTimestamp = model.receiveTimestamp;
        this.deferStage = model.deferStage;
        this.typeChanged = model.typeChanged;
        this.actionedBy = model.actionedBy;
        this.status = model.status;
        this.comment = model.comment;
        this.stagedAt = model.stagedAt;
    }

    public static getTableName() {
        return "loans";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
    }

    get loanProduct(): string {
        return this._loanProduct;
    }

    set loanProduct(value: string) {
        this._loanProduct = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get tenure(): number {
        return this._tenure;
    }

    set tenure(value: number) {
        this._tenure = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get receiveTimestamp(): Date {
        return this._receiveTimestamp;
    }

    set receiveTimestamp(value: Date) {
        this._receiveTimestamp = value;
    }

    get deferStage(): number {
        return this._deferStage;
    }

    set deferStage(value: number) {
        this._deferStage = value;
    }

    get typeChanged(): boolean {
        return this._typeChanged;
    }

    set typeChanged(value: boolean) {
        this._typeChanged = value;
    }

    get actionedBy(): string {
        return this._actionedBy;
    }

    set actionedBy(value: string) {
        this._actionedBy = value;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get comment(): string {
        return this._comment;
    }

    set comment(value: string) {
        this._comment = value;
    }

    get stagedAt(): Date {
        return this._stagedAt;
    }

    set stagedAt(value: Date) {
        this._stagedAt = value;
    }

    get securityTypes(): SecurityType[] {
        return this._securityTypes;
    }

    set securityTypes(value: SecurityType[]) {
        this._securityTypes = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get customer(): Customer {
        return this._customer;
    }

    set customer(value: Customer) {
        this._customer = value;
    }

    get loanProductObject(): LoanProduct {
        return this._loanProductObject;
    }

    set loanProductObject(value: LoanProduct) {
        this._loanProductObject = value;
    }
}

export default Loan;