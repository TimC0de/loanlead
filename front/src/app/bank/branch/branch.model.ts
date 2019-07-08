import Entity from '../entity/entity.model';

class Branch {
    private _id?: number;
    private _entityId?: number;
    private _name?: string;
    private _type?: string;
    private _district?: string;
    private _town?: string;
    private _createdAt?: string;

    private _entity?: Entity;

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
