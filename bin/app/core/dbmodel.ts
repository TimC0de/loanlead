
import * as Knex from "knex";

import Column from "./interfaces/column";

import ManyToManyRelation from "./interfaces/manyToManyRelation";

import Relation from "./interfaces/relation";

class DBModel {


    protected primaryColumn: Map<string, string> = new Map();
    protected columns: Map<string, string> = new Map();
    protected relations: Relation[] = [];
    public manyToManyRelations: ManyToManyRelation[] = [];

    public constructor(columns, relations, manyToManyRelations) {
        this.columns = columns;
        this.relations = relations;
        this.manyToManyRelations = manyToManyRelations;
    }

    public getTableName() {

        return "";
    }

    public parseToRow(): object {
        
        const result: object = {};

        this.columns.forEach((value, key) => {
            result[value] = this[key];
        });

        return result;
    }

    public assignRow(row: object, rowColumnPrefix?: string): this {
        rowColumnPrefix = rowColumnPrefix ? rowColumnPrefix : "";

        this.columns.forEach((value, key) => {
            this[key] = row[`${rowColumnPrefix}${value}`];
        });

        return this;
    }

    public assignRequest(params: object): this {
        Object.keys(params).forEach((key) => {
            this[key] = params[key];
        });

        return this;
    }

    public getFields(columnsType: string): string[] {
        return Array.from(
            columnsType === "model"
                ? this.columns.keys()
                : this.columns.values(),
        );
    }
}

export default DBModel;