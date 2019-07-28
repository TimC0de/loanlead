import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToMany from "../../../core/decorators/oneToMany";
import Entity from "./entity";
import Relation from "../../../core/interfaces/relation";
import ManyToManyRelation from "../../../core/interfaces/manyToManyRelation";

class Branch extends DBModel {
    @column("id")
    private _id?: number;

    @oneToMany(Entity.prototype, "name", "entity")
    @column("entity_name")
    private _entityName?: string;

    @column("name")
    private _name?: string;

    @column("type")
    private _type?: string;

    @column("district")
    private _district?: string;

    @column("town")
    private _town?: string;

    @column("created_at")
    private _createdAt?: Date;

    private _entity?: Entity;

    public columns: Map<string, string> = new Map();
    public relations: Relation[] = [];
    public manyToManyRelations: ManyToManyRelation[] = [];

    public getTableName() {
        return "branches";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get entityName(): string {
        return this._entityName;
    }

    set entityName(value: string) {
        this._entityName = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get district(): string {
        return this._district;
    }

    set district(value: string) {
        this._district = value;
    }

    get town(): string {
        return this._town;
    }

    set town(value: string) {
        this._town = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value ? value : new Date();
    }

    get entity(): Entity {
        return this._entity;
    }

    set entity(value: Entity) {
        this._entity = value;
    }
}

export default Branch;