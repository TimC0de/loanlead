import * as Knex from "knex";
import {QueryBuilder} from "knex";
import DBModel from "./dbmodel";
import ManyToManyRelation from "./interfaces/manyToManyRelation";
import Relation from "./interfaces/relation";
import Utils from "./utils";

class DBService<T extends DBModel> {
    protected static _knex: Knex;
    protected table: string;
    protected model: T;

    public constructor(model: T) {
        this.table = "";
        this.model = model;
    }

    static get knex(): Knex {
        return this._knex;
    }

    static set knex(_knex: Knex) {
        this._knex = _knex;
    }

    public setConditions(optionsObject: object, query: QueryBuilder): QueryBuilder {
        if (optionsObject) {
            Object.keys(optionsObject).forEach((key) => {
                const baseFunctionName: string = optionsObject[key].logicalFunction ? "orWhere" : "where";

                if (optionsObject[key].range) {
                    const functionName: string =
                        baseFunctionName + Utils.capitaliseString(optionsObject[key].rangeFunction);

                    query = query[functionName](key, optionsObject[key].range);
                } else {
                    const conditionOperator = optionsObject[key].conditionOperator
                        ? optionsObject[key].conditionOperator
                        : "=";

                    const conditionValue = typeof optionsObject[key] === "object"
                        ? optionsObject[key].conditionValue
                        : optionsObject[key];

                    query = query[baseFunctionName](key, conditionOperator, conditionValue);
                }
            });
        }

        return query;
    }

    public findCount(optionsObject?: object) {
        let query = DBService.knex(this.table);

        if (optionsObject) {
            query = this.setConditions(optionsObject, query);
        }

        return query.count();
    }

    protected find(
        optionsObject?: object,
        orderByColumn?: string,
        page?: number,
        limit?: number,
    ) {
        let query: QueryBuilder = DBService.knex(this.table);
        const relations: Relation[] = this.model.relations;
        const manyToManyRelations: ManyToManyRelation[] = this.model.manyToManyRelations;

        // storing related table names
        const relatedTablesName: string[] =
            relations.map((relation) => relation.model.getTableName());

        const manyToManyRelatedTablesName: string[] =
            manyToManyRelations.map((relation) => relation.model.getTableName());

        // define selected columns
        let models: DBModel[] = [this.model];

        if (relations) {
            models = models
                .concat(relations.map((relation) => relation.model));
        }

        if (manyToManyRelations) {
            models = models
                .concat(manyToManyRelations.map((relation) => relation.model));
        }

        const columns: Array<{ [key: string]: string }> = [];
        const tableNames: string[] = models.map((model) => model.getTableName());

        models.forEach((model, index) => {
            model.columns.forEach((columnName) => {
                const column: { [key: string]: string } = {};
                const tableName: string = tableNames[index];

                column[`${tableName}_${columnName}`] = `${tableName}.${columnName}`;

                columns.push(column);
            });
        });

        query = query.column(columns);

        // cross join with related table
        relations.forEach((relation, index: number) => {
            query = query.crossJoin(
                relatedTablesName[index],
                `${this.table}.${relation.targetColumn}`,
                `${relatedTablesName[index]}.${relation.relatedColumn}`,
            );
        });

        manyToManyRelations.forEach((relation, index: number) => {
            query = query
                .crossJoin(
                    relation.bridgeTableName,
                    `${this.table}.id`,
                    `${relation.bridgeTableName}.${relation.bridgeTableModelColumn}`,
                )
                .crossJoin(
                    manyToManyRelatedTablesName[index],
                    `${relation.bridgeTableName}.${relation.bridgeTableRelatedModelColumn}`,
                    `${manyToManyRelatedTablesName[index]}.id`,
                );
        });

        // setting query conditions
        if (optionsObject) {
            query = this.setConditions(optionsObject, query);
        }

        // ordering query by specified column
        query = query.orderBy(orderByColumn
            ? orderByColumn
            : `${this.table}.id`,
        );

        if (limit) {
            query = query.limit(limit);

            if (page) {
                query = query.offset((page - 1) * limit);
            }
        }

        // process result
        return query
            .then((data) => {
                const resultModels: T[] = [];
                let firstIteration: boolean = true;
                let previousIndex: number = 0;

                data.forEach((row, index) => {
                    if (!firstIteration &&
                        data[previousIndex][`${this.table}_id`] === data[index][`${this.table}_id`]
                    ) {
                        let newRelationIndex: number = -1;

                        manyToManyRelations.forEach((relation, relationIndex) => {
                            const relationTableName: string = manyToManyRelatedTablesName[relationIndex];

                            if (data[previousIndex][`${relationTableName}_id`]
                                !== data[index][`${relationTableName}_id`]) {
                                newRelationIndex = index;
                            }
                        });

                        if (newRelationIndex > -1) {
                            const relation = manyToManyRelations[newRelationIndex];

                            models[models.length - 1][relation.relatedModel]
                                .push(
                                    Object.assign({}, this.model)
                                        .assignRow(row, `${relatedTablesName[newRelationIndex]}_`),
                                );
                        }
                    } else {
                        const model: T = Object.create(new DBModel())
                            .assignRow(row, `${this.table}_`);

                        relations.forEach((relation, relationIndex) => {
                            model[relation.relatedModelField] = Object.assign({}, this.model).assignRow(
                                row,
                                `${relatedTablesName[relationIndex]}_`);
                        });

                        manyToManyRelations.forEach((relation, relationIndex) => {
                            model[relation.relatedModel] = [
                                Object.assign({}, this.model)
                                    .assignRow(row, `${manyToManyRelatedTablesName[relationIndex]}_`),
                            ];
                        });

                        models.push(model);
                        previousIndex = index;
                    }

                    if (firstIteration) {
                        firstIteration = false;
                    }
                });

                return models;
            });
    }

    public findAll(page?: number, limit?: number) {
        return this.find(
            null,
            null,
            page,
            limit,
        );
    }

    public findById(id: number) {
        const optionsObject: { [key: string]: any } = Object.create(null);
        optionsObject[`${this.table}.id`] = id;

        return this.find(optionsObject);
    }

    public add(model: T) {
        return DBService.knex(this.table)
            .insert(model.parseToRow())
            .then((insertedRowsIds) => {
                if (insertedRowsIds) {
                    return this.findById(insertedRowsIds.pop());
                }
            });
    }

    public update(model: T, id: number) {
        return DBService.knex(this.table)
            .where("id", id)
            .update(model.parseToRow())
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    return this.findById(id);
                }
            });
    }

    public delete(id: number) {
        return DBService.knex(this.table)
            .where("id", id)
            .del();
    }
}

export default DBService;