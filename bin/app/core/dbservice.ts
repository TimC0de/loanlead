import * as Knex from "knex";
import {QueryBuilder} from "knex";
import DBModel from "./dbmodel";

class DBService<T extends DBModel> {
    protected static _knex: Knex;
    protected DBModelClass: new (model: { [key: string]: any }) => T;
    protected tableName: string;

    protected constructor(DBModelClass: new (model: { [key: string]: any }) => T, tableName: string) {
        this.DBModelClass = DBModelClass;
        this.tableName = tableName;
    }

    static get knex(): Knex {
        return this._knex;
    }

    static set knex(_knex: Knex) {
        this._knex = _knex;
    }

    protected find(dbColumn?: string, dbColumnValue?: any) {
        let query: QueryBuilder = DBService.knex(this.tableName);

        let relations: Array<{
            relation: string,
            dbModel: new (model: { [key: string]: any }) => T,
            targetColumn: string,
            dbModelColumn: string,
            relatedModelField: string,
        }> = [];

        // find relations static property
        Object.keys(this.DBModelClass).forEach((key) => {
            if (key === "relations") {
                relations = this.DBModelClass[key];
            }
        });

        const relatedTablesName: string[] = [];

        relations.forEach((relation) => {
            Object.keys(relation.dbModel).forEach((key) => {
                if (key === "getTableName") {
                    relatedTablesName.push(relation.dbModel[key]());
                }
            });
        });

        // make aliases for each table's id column
        const columns: any[] = [ "*" ];

        const tableId: { [key: string]: string} = {};
        tableId[`${this.tableName}_id`] = `${this.tableName}.id`;

        columns.push(tableId);

        relatedTablesName.forEach((relatedTableName) => {
            const relationId: { [key: string]: string } = {};
            relationId[`${relatedTableName}_id`] = `${relatedTableName}.id`;

            columns.push(relationId);
        });

        query = query
            .column(columns);

        const $this: DBService<T> = this;

        // cross join with related table
        relations.forEach((relation, index: number) => {
            query = query.crossJoin(
                relatedTablesName[index],
                function() {
                    this.on( function() {
                        this
                            .on(
                                `${$this.tableName}.${relation.targetColumn}`,
                                "=",
                                `${relatedTablesName[index]}.${relation.dbModelColumn}`,
                            );

                        if (dbColumn && dbColumnValue) {
                            this
                                .onIn(
                                    dbColumn,
                                    [ dbColumnValue ],
                                );
                        }
                    });
                });
        });

        query = query
            .orderBy(`${this.tableName}_id`);

        // process result
        return query
            .map((row: {id: number}) => {
                row.id = row[`${this.tableName}_id`];

                const model: T = DBModel.valueOfRow<T>(row, this.DBModelClass);

                relations.forEach((relation, index) => {
                    row.id = row[`${relatedTablesName[index]}_id`];

                    model[relation.relatedModelField] = DBModel.valueOfRow(row, relation.dbModel);
                });

                return model;
            });
    }

    public findAll() {
        return this.find();
    }

    public findById(id: number) {
        return this.find(`${this.tableName}.id`, id);
    }

    public add(model: T) {
        return DBService.knex(this.tableName)
            .insert(DBModel.parseToRow<T>(model));
    }

    public update(model: T, id: number) {
        return DBService.knex(this.tableName)
            .where("id", id)
            .update(DBModel.parseToRow<T>(model));
    }

    public delete(ids: number[]) {
        return DBService.knex(this.tableName)
            .whereIn("id", ids)
            .del();
    }
}

export default DBService;