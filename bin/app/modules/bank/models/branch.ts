import DBModel from "../../../core/dbmodel";
import column from "../../../core/decorators/column";
import oneToMany from "../../../core/decorators/oneToMany";
import Entity from "./entity";

class Branch extends DBModel {
    @column("id")
    private _id?: number;

    @oneToMany(Entity, "id", "entity")
    @column("entity_id")
    private _entityId?: number;

    @column("name")
    private _name?: string;

    @column("type")
    private _type?: string;

    @column("district")
    private _district?: string;

    @column("town")
    private _town?: string;

    @column("created_at")
    private _createdAt?: string;

    private _entity?: Entity;

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
        this.entityId = model.entityId;
        this.name = model.name;
        this.type = model.type;
        this.district = model.district;
        this.town = model.town;
        this.createdAt = model.createdAt;
    }

    public static getTableName() {
        return "branches";
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get entityId(): number {
        return this._entityId;
    }

    set entityId(value: number) {
        this._entityId = value;
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

    get createdAt(): string {
        return this._createdAt;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }

    get entity(): Entity {
        return this._entity;
    }

    set entity(value: Entity) {
        this._entity = value;
    }
}

export default Branch;