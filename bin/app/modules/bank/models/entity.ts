import Dbmodel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import Relation from "../../../core/interfaces/relation";
import ManyToManyRelation from "../../../core/interfaces/manyToManyRelation";

class Entity extends Dbmodel {
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

    public columns: Map<string, string> = new Map();
    public relations: Relation[] = [];
    public manyToManyRelations: ManyToManyRelation[] = [];

    public getTableName() {
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