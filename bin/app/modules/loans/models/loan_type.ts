import Dbmodel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class LoanType extends Dbmodel {
    @column("id")
    private _id?: number;

    @column("loan_type")
    private _loanType?: string;

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
        this.loanType = model.loanType;
    }

    public static getTableName() {
        return "loan_types";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get loanType(): string {
        return this._loanType;
    }

    set loanType(value: string) {
        this._loanType = value;
    }
}

export default LoanType;