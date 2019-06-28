import DBModel from "../../../core/dbmodel";
import SecurityType from "./security_type";

class Loan extends DBModel {
    private _id?: number;
    private _customerId?: number;
    private _loanProduct?: string;
    private _amount?: number;
    private _tenure?: number;
    private _createdAt?: string;
    private _receiveTimestamp?: string;
    private _deferStage?: number;
    private _typeChanged?: boolean;
    private _actionedBy?: string;
    private _status?: string;
    private _comment?: string;
    private _actionedAt?: string;
    private _stagedAt?: string;

    private _securityTypes?: SecurityType[];

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
        this.actionedAt = model.actionedAt;
        this.stagedAt = model.stagedAt;
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

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }

    get receiveTimestamp(): string {
        return this._receiveTimestamp;
    }

    set receiveTimestamp(value: string) {
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

    get actionedAt(): string {
        return this._actionedAt;
    }

    set actionedAt(value: string) {
        this._actionedAt = value;
    }

    get stagedAt(): string {
        return this._stagedAt;
    }

    set stagedAt(value: string) {
        this._stagedAt = value;
    }

    get securityTypes(): SecurityType[] {
        return this._securityTypes;
    }

    set securityTypes(value: SecurityType[]) {
        this._securityTypes = value;
    }
}

export default Loan;