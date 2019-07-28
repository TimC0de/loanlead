import Dbmodel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToMany from "../../../core/decorators/oneToMany";
import SMSTemplate from "./sms_template";

class SMSMessage extends Dbmodel {
    @column("id")
    private _id?: number;

    @column("phone_number")
    private _phoneNumber?: string;

    @oneToMany(SMSTemplate, "id", "template")
    @column("template_id")
    private _templateId?: string;

    @column("created_at")
    private _createdAt?: Date;

    private _template?: SMSTemplate;

    public static columns: { [key: string]: any } = {
        rowModel: { },
        modelRow: { },
    };

    public static relations: Array<{
        relation: string,
        dbModel: new <T extends Dbmodel>(model: { [key: string]: any }) => T,
        targetColumn: string,
        dbModelColumn: string,
        relatedModelField: string,
    }> = [];

    public constructor(model: { [key: string]: any }) {
        super();

        this.id = model.id;
        this.phoneNumber = model.phoneNumber;
        this.templateId = model.templateId;
        this.createdAt = model.createdAt;
    }

    public static getTableName() {
        return "sms_messages";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    get templateId(): string {
        return this._templateId;
    }

    set templateId(value: string) {
        this._templateId = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value ? value : new Date();
    }

    get template(): SMSTemplate {
        return this._template;
    }

    set template(value: SMSTemplate) {
        this._template = value;
    }
}

export default SMSMessage;