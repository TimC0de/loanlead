import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToOne from "../../../core/decorators/oneToOne";
import PhoneNumber from "../../phone_numbers/models/phone_number";

class Customer extends DBModel {
    @column("id")
    private _id?: number;

    @oneToOne(PhoneNumber, "id", "phoneNumber")
    @column("phone_numbers_id")
    private _phoneNumbersId?: number;

    @column("name")
    private _name?: string;

    @column("document")
    private _document?: string;

    @column("document_type")
    private _documentType?: string;

    @column("created_at")
    private _createdAt?: string;

    private _phoneNumber?: PhoneNumber;

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
        this.phoneNumbersId = model.phoneNumbersId;
        this.name = model.name;
        this.document = model.document;
        this.documentType = model.documentType;
        this.createdAt = model.createdAt;
    }

    public static getTableName() {
        return "customers";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get phoneNumbersId(): number {
        return this._phoneNumbersId;
    }

    set phoneNumbersId(value: number) {
        this._phoneNumbersId = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get document(): string {
        return this._document;
    }

    set document(value: string) {
        this._document = value;
    }

    get documentType(): string {
        return this._documentType;
    }

    set documentType(value: string) {
        this._documentType = value;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }

    get phoneNumber(): PhoneNumber {
        return this._phoneNumber;
    }

    set phoneNumber(value: PhoneNumber) {
        this._phoneNumber = value;
    }
}

export default Customer;