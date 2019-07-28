import Dbmodel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class LoanProduct extends Dbmodel {
    @column("id")
    private _id?: number;

    @column("loan_product")
    private _loanProduct?: string;

    @column("loan_type")
    private _loanType?: string;

    @column("max_amount")
    private _maxAmount?: number;

    @column("max_tenure")
    private _maxTenure?: number;

    @column("time_threshold")
    private _timeThreshold?: number;

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
        this.loanProduct = model.loanProduct;
        this.loanType = model.loanType;
        this.maxAmount = model.maxAmount;
        this.maxTenure = model.maxTenure;
        this.timeThreshold = model.timeThreshold;
    }

    public static getTableName() {
        return "loan_products";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get loanProduct(): string {
        return this._loanProduct;
    }

    set loanProduct(value: string) {
        this._loanProduct = value;
    }

    get loanType(): string {
        return this._loanType;
    }

    set loanType(value: string) {
        this._loanType = value;
    }

    get maxAmount(): number {
        return this._maxAmount;
    }

    set maxAmount(value: number) {
        this._maxAmount = value;
    }

    get maxTenure(): number {
        return this._maxTenure;
    }

    set maxTenure(value: number) {
        this._maxTenure = value;
    }

    get timeThreshold(): number {
        return this._timeThreshold;
    }

    set timeThreshold(value: number) {
        this._timeThreshold = value;
    }
}

export default LoanProduct;