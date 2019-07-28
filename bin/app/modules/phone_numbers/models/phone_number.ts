import Dbmodel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class PhoneNumber extends Dbmodel {
    @column("id")
    private _id?: number;

    @column("first_phone_number")
    private _firstPhoneNumber?: string;

    @column("second_phone_number")
    private _secondPhoneNumber?: string;

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
        this.firstPhoneNumber = model.firstPhoneNumber;
        this.secondPhoneNumber = model.secondPhoneNumber;
    }

    public static getTableName() {
        return "phone_numbers";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstPhoneNumber(): string {
        return this._firstPhoneNumber;
    }

    set firstPhoneNumber(value: string) {
        this._firstPhoneNumber = value;
    }

    get secondPhoneNumber(): string {
        return this._secondPhoneNumber;
    }

    set secondPhoneNumber(value: string) {
        this._secondPhoneNumber = value;
    }
}

export default PhoneNumber;