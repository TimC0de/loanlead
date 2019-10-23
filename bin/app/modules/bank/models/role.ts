import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import ManyToManyRelation from "../../../core/interfaces/manyToManyRelation";
import Relation from "../../../core/interfaces/relation";

class Role extends DBModel {
    @column("id")
    private _id?: number;

    @column("name")
    private _name?: string;

    @column("display_name")
    private _displayName?: string;

    @column("send_sms")
    private _sendSms?: boolean;

    public columns: Map<string, string> = new Map();
    public relations: Relation[] = [];
    public manyToManyRelations: ManyToManyRelation[] = [];

    public getTableName() {
        return "roles";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get displayName(): string {
        return this._displayName;
    }

    set displayName(value: string) {
        this._displayName = value;
    }

    get sendSms(): boolean {
        return this._sendSms;
    }

    set sendSms(value: boolean) {
        this._sendSms = value;
    }
}

export default Role;