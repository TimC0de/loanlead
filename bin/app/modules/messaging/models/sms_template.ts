import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToMany from "../../../core/decorators/oneToMany";
import Role from "../../bank/models/role";

class SMSTemplate extends DBModel {
    @column("id")
    private _id?: number;

    @column("type")
    private _type?: string;

    @oneToMany(Role.prototype, "name", "_stage")
    @column("stage_id")
    private _stageId?: string;

    @column("template")
    private _template?: string;

    private _stage?: Role;

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
        this.type = model.type;
        this.stageId = model.stageId;
        this.template = model.template;
    }

    public static getTableName() {
        return "sms_templates";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get stageId(): string {
        return this._stageId;
    }

    set stageId(value: string) {
        this._stageId = value;
    }

    get template(): string {
        return this._template;
    }

    set template(value: string) {
        this._template = value;
    }

    get stage(): Role {
        return this._stage;
    }

    set stage(value: Role) {
        this._stage = value;
    }
}

export default SMSTemplate;