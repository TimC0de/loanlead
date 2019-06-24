import * as Knex from "knex";
import DBModel from "./dbmodel";

class DBService<T extends DBModel> {
    protected static _knex: Knex;
    protected DBModelClass: new () => T;
    protected tableName: string;

    protected constructor(DBModelClass: new () => T) {
        this.DBModelClass = DBModelClass;
        this.tableName = new DBModelClass().getTableName();
    }

    static get knex(): Knex {
        return this._knex;
    }

    static set knex(_knex: Knex) {
        this._knex = _knex;
    }

    public findAll() {
        return DBService.knex(this.tableName)
            .then((data) => data);
    }

    public findById(id: number) {
        return DBService.knex(this.tableName)
            .where("id", id)
            .map((row) => new this.DBModelClass().parseRowToModel(row));
    }

    public add(model: T) {
        return DBService.knex(this.tableName)
            .insert(DBModel.parseToRow(model))
            .returning("*")
            .map((row) => new this.DBModelClass().parseRowToModel(row));
    }

    public update(model: T, id: number) {
        return DBService.knex(this.tableName)
            .where("id", id)
            .update(DBModel.parseToRow(model))
            .returning("*")
            .then((data) => new this.DBModelClass().parseRowToModel(data.pop()));
    }

    public delete(ids: number[]) {
        return DBService.knex(this.tableName)
            .whereIn("id", ids)
            .del();
    }
}

export default DBService;