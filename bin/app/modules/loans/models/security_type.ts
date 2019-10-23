import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class SecurityType extends DBModel {
    @column("id")
    private _id?: number;

    @column("security_type")
    private _securityType?: string;

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
        this.securityType = model.securityType;
    }

    public static getTableName() {
        return "security_types";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get securityType(): string {
        return this._securityType;
    }

    set securityType(value: string) {
        this._securityType = value;
    }
}

export default SecurityType;