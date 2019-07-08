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

const removeUnderscore = (s: string): string => {
    return s.replace("_", "");
};

class DBModel {
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

    public static manyToManyRelations: Array<{
        relatedModelClass: new <T extends DBModel>(model: { [key: string]: any }) => T,
        bridgeTableRelatedModelColumn: string,
        bridgeTableRelatedModel: string,
        bridgeTableName: string,
        relatedModel: string,
    }> = [];

    public static parseToRow<T extends DBModel>(model: T): { [key: string]: any } {
        const result: { [key: string]: any} = {};
        let columns: {
            rowModel: { [key: string]: string },
            modelRow: { [key: string]: string },
        } = Object.create(null);

        Object.keys(model.constructor).forEach((key) => {
            if (key === "columns") {
                columns = model.constructor[key];
            }
        });

        Object.keys(columns.modelRow).forEach((prop) => {
            result[columns.modelRow[prop]] = model[prop];
        });

        return result;
    }

    public static valueOfRow<T extends DBModel>(
        row: { [key: string]: any },
        modelClass: new (model: { [key: string]: any }) => T,
        rowColumnPrefix?: string,
    ): T {
        const result: { [key: string]: any} = Object.create(null);
        let columns: { [key: string]: any } = Object.create(null);

        Object.keys(modelClass).forEach((key) => {
            if (key === "columns") {
                columns = modelClass[key].rowModel;
            }
        });

        Object.keys(columns).forEach((prop) => {
            result[columns[prop]] = row[
                rowColumnPrefix
                    ? `${rowColumnPrefix}${prop}`
                    : prop
                ];
        });

        return new modelClass(result);
    }

    public static valueOfRequest<T extends DBModel>(
        params: { [key: string]: any},
        modelClass: new (model: { [key: string]: any }) => T,
    ): T {
        const result: { [key: string]: any} = Object.create(null);
        let columns: {
            rowModel: { [key: string]: string},
            modelRow: { [key: string]: string},
        } = Object.create(null);

        Object.keys(modelClass).forEach((key) => {
            if (key === "columns") {
                columns = modelClass[key];
            }
        });

        Object.keys(columns.modelRow).forEach((prop) => {
            result[prop] = params[prop];
        });

        return new modelClass(result);
    }

    public static getFields<T extends DBModel>(
        fieldsType: string,
        modelClass: new (model: { [key: string]: any }) => T,
    ): string[] {
        let columns: {
            rowModel: { [key: string]: string },
            modelRow: { [key: string]: string },
        } = Object.create(null);

        Object.keys(modelClass).forEach((key) => {
            if (key === "columns") {
                columns = modelClass[key];
            }
        });

        return fieldsType === "model"
            ? Object.keys(columns.modelRow)
            : Object.keys(columns.rowModel);
    }
}

export default DBModel;