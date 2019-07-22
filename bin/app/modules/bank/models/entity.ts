import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";

class Entity extends DBModel {
    @column("id")
    private _id?: number;

    @column("name")
    private _name?: string;

    @column("short_name")
    private _shortName?: string;

    @column("box_number")
    private _boxNumber?: string;

    @column("plot_number")
    private _plotNumber?: string;

    @column("branches_number")
    private _branchesNumber?: number;

    @column("description")
    private _description?: string;

    @column("created_at")
    private _createdAt?: Date;

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
        this.shortName = model.shortName;
        this.boxNumber = model.boxNumber;
        this.plotNumber = model.plotNumber;
        this.branchesNumber = model.branchesNumber;
        this.description = model.description;
        this.createdAt = model.createdAt;
    }

    public static getTableName() {
        return "entities";
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

    get shortName(): string {
        return this._shortName;
    }

    set shortName(value: string) {
        this._shortName = value;
    }

    get boxNumber(): string {
        return this._boxNumber;
    }

    set boxNumber(value: string) {
        this._boxNumber = value;
    }

    get plotNumber(): string {
        return this._plotNumber;
    }

    set plotNumber(value: string) {
        this._plotNumber = value;
    }

    get branchesNumber(): number {
        return this._branchesNumber;
    }

    set branchesNumber(value: number) {
        this._branchesNumber = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value ? value : new Date();
    }
}

export default Entity;