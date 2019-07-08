import * as Knex from "knex";
import {QueryBuilder} from "knex";
import DBModel from "./dbmodel";

const capitaliseString = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

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

    protected find(
        optionsObject?: { [key: string]: any },
        orderByColumn?: string,
    ) {
        let query: QueryBuilder = DBService.knex(this.tableName);
        let relations: Array<{ [key: string]: any }> = [];
        let manyToManyRelations: Array<{ [key: string]: any }> = [];

        // find relations static property
        Object.keys(this.DBModelClass).forEach((key) => {
            if (key === "relations") {
                relations = this.DBModelClass[key];
            }

            if (key === "manyToManyRelations") {
                manyToManyRelations = this.DBModelClass[key];
            }
        });

        // storing related table names
        const relatedTablesName: string[] = [];

        relations.forEach((relation) => {
            Object.keys(relation.dbModel).forEach((key) => {
                if (key === "getTableName") {
                    relatedTablesName.push(relation.dbModel[key]());
                }
            });
        });

        const manyToManyRelatedTablesName: string[] = [];

        manyToManyRelations.forEach((relation) => {
            Object.keys(relation.relatedModelClass).forEach((key) => {
                if (key === "getTableName") {
                    manyToManyRelatedTablesName.push(relation.relatedModelClass[key]());
                }
            });
        });

        // define selected columns
        let entityClasses: Array<new (model: { [key: string]: any }) => T> =
            [this.DBModelClass];

        if (relations) {
            entityClasses = entityClasses
                .concat(
                    relations
                        .map((relation) => relation.dbModel),
                );
        }

        if (manyToManyRelations) {
            entityClasses = entityClasses
                .concat(
                    manyToManyRelations
                        .map((relation) => relation.relatedModelClass),
                );

        }

        const columns: Array<{ [key: string]: string }> = [];
        const tableNames: string[] = [];

        entityClasses.forEach((entityClass) => {
            Object.keys(entityClass).forEach((key) => {
                if (key === "getTableName") {
                    tableNames.push(entityClass[key]());
                }
            });
        });

        entityClasses.forEach((entityClass, index) => {
            Object.keys(entityClass).forEach((key) => {
                if (key === "columns") {
                    const modelRowColumns: { [key: string]: string } = entityClass[key].modelRow;

                    Object.keys(modelRowColumns).forEach((modelRowColumnKey) => {
                        const columnAlias: { [key: string]: string } = Object.create(null);
                        columnAlias[`${tableNames[index]}_${modelRowColumns[modelRowColumnKey]}`] =
                            `${tableNames[index]}.${modelRowColumns[modelRowColumnKey]}`;

                        columns.push(columnAlias);
                    });
                }
            });
        });

        query = query
            .column(columns);

        // cross join with related table
        relations.forEach((relation, index: number) => {
            query = query.crossJoin(
                relatedTablesName[index],
                `${this.tableName}.${relation.targetColumn}`,
                `${relatedTablesName[index]}.${relation.dbModelColumn}`,
            );
        });

        manyToManyRelations.forEach((relation, index: number) => {
            query = query
                .crossJoin(
                    relation.bridgeTableName,
                    `${this.tableName}.id`,
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
            Object.keys(optionsObject).forEach((key) => {
                const baseFunctionName: string = optionsObject[key].logicalFunction
                    ? "orWhere"
                    : "where";

                if (optionsObject[key].range) {
                    const functionName: string =
                        baseFunctionName + capitaliseString(optionsObject[key].rangeFunction);

                    query = query[functionName](
                        key,
                        optionsObject[key].range,
                    );
                } else {
                    query = query[baseFunctionName](
                        key,
                        optionsObject[key].conditionOperator
                            ? optionsObject[key].conditionOperator
                            : "=",
                        typeof optionsObject[key] === "object"
                            ? optionsObject[key].conditionValue
                            : optionsObject[key],
                    );
                }
            });
        }

        // ordering query by specified column
        query = query
            .orderBy(orderByColumn
                ? orderByColumn
                : `${this.tableName}.id`,
            );

        // process result
        return query
            .then((data) => {
                const models: T[] = [];
                let firstIteration: boolean = true;
                let previousIndex: number = 0;

                data.forEach((row, index) => {
                    if (!firstIteration &&
                        data[previousIndex][`${this.tableName}_id`] === data[index][`${this.tableName}_id`]
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

                            models[models.length - 1][relation.relatedModelField].push(
                                DBModel.valueOfRow(
                                    row,
                                    relation.dbModel,
                                    `${relatedTablesName[newRelationIndex]}_`),
                            );
                        }
                    } else {
                        const model: T = DBModel.valueOfRow<T>(
                            row,
                            this.DBModelClass,
                            `${this.tableName}_`,
                        );

                        relations.forEach((relation, relationIndex) => {
                            model[relation.relatedModelField] = DBModel.valueOfRow(
                                row,
                                relation.dbModel,
                                `${relatedTablesName[relationIndex]}_`);
                        });

                        manyToManyRelations.forEach((relation, relationIndex) => {
                            model[relation.relatedModel] = [
                                DBModel.valueOfRow(
                                    row,
                                    relation.relatedModelClass,
                                    `${manyToManyRelatedTablesName[relationIndex]}_`),
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

    public findAll() {
        return this.find();
    }

    public findById(id: number) {
        const optionsObject: { [key: string]: any } = Object.create(null);
        optionsObject[`${this.tableName}.id`] = id;

        return this.find(optionsObject);
    }

    public add(model: T) {
        return DBService.knex(this.tableName)
            .insert(DBModel.parseToRow<T>(model))
            .then((insertedRowsIds) => {
                if (insertedRowsIds) {
                    return this.findById(insertedRowsIds.pop());
                }
            });
    }

    public update(model: T, id: number) {
        return DBService.knex(this.tableName)
            .where("id", id)
            .update(DBModel.parseToRow<T>(model))
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    return this.findById(id);
                }
            });
    }

    public delete(id: number) {
        return DBService.knex(this.tableName)
            .where("id", id)
            .del();
    }
}

export default DBService;