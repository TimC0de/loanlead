import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class Role extends DBModel {
    @column("id")
    private _id?: number;

    @column("name")
    private _name?: string;

    @column("display_name")
    private _displayName?: string;

    @column("send_sms")
    private _sendSms?: boolean;

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
        this.name = model.name;
        this.displayName = model.displayName;
        this.sendSms = model.sendSms;
    }

    public static getTableName() {
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