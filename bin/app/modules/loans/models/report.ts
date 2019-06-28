import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToOne from "../../../core/decorators/oneToOne";
import User from "../../bank/models/user";

class Report extends DBModel {
    @column("id")
    private _id?: number;

    @column("loan_id")
    private _loanId?: number;

    @oneToOne(User, "employee_id", "user")
    @column("actioned_by")
    private _actionedBy?: string;

    @column("status")
    private _status?: string;

    @column("comment")
    private _comment?: string;

    @column("created_at")
    private _actionedAt?: string;

    private _user?: User;

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
        this.loanId = model.loanId;
        this.actionedBy = model.actionedBy;
        this.status = model.status;
        this.comment = model.comment;
        this.actionedAt = model.actionedAt;
    }

    public static getTableName() {
        return "reports";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get loanId(): number {
        return this._loanId;
    }

    set loanId(value: number) {
        this._loanId = value;
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

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }
}

export default Report;