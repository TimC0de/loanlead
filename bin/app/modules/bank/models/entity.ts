import DBModel from "../../../core/dbmodel";

class Entity extends DBModel {
    private _id: number;
    private _name: string;
    private _shortName: string;
    private _boxNumber: string;
    private _plotNumber: string;
    private _branchesNumber: number;
    private _description: string;
    private _logoPath: string;
    private _createdAt: string;

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

    get logoPath(): string {
        return this._logoPath;
    }

    set logoPath(value: string) {
        this._logoPath = value;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }
}

export default Entity;