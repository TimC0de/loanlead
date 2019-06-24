import * as Knex from "knex";

const toSnakeCase = (s: string): string => {
    return s
        .replace(/[a-z][A-Z]/g, (sub) => sub.charAt(0) + "_" + sub.charAt(1))
        .replace(/[A-Z]/g, (sub) => sub.toLowerCase());
};

const toCamelCase = (s: string): string => {
    return s
        .replace(/_[a-z]/g, (sub) => sub.charAt(1).toUpperCase())
        .replace(/_/g, "");
};

class DBModel {
    public getTableName() {
        return "";
    }

    public static parseToRow(model: object): { [key: string]: any } {
        const result: { [key: string]: any} = {};

        for (const prop in model) {
            if (model.hasOwnProperty(prop) && typeof model[prop] !== "function") {
                result[toSnakeCase(prop)] = model[prop];
            }
        }

        return result;
    }

    public parseRowToModel(row: { [key: string]: any }) {
        for (const prop in row) {
            if (row.hasOwnProperty(prop)) {
                this[toCamelCase(prop)] = row[prop];
            }
        }

        return this;
    }

    public parseRequestToModel(params: { [key: string]: any}) {
        for (const prop in params) {
            if (params.hasOwnProperty(prop)) {
                this[prop] = params[prop];
            }
        }

        return this;
    }

    public getFields(): string[] {
        const fields: string[] = [];

        for (const prop in this) {
            if (this.hasOwnProperty(prop)) {
                fields.push(prop);
            }
        }

        return fields;
    }
}

export default DBModel;