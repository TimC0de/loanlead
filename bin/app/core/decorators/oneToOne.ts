import DBModel from "../dbmodel";

const replaceUnderscore = (s: string): string => {
    return s.replace("_", "");
};

export default function oneToOne<T extends DBModel>(
    dbModelClass: new (model: { [key: string]: any}) => T,
    secondTableColumn: string,
    relatedModelProperty: string,
) {
    return (target, value: string) => {
        let columns: {
            rowModel: { },
            modelRow: { },
        } = Object.create(null);

        Object.keys(target.constructor).forEach((key) => {
            if (key === "columns") {
                columns = target.constructor[key];
            }

            if (key === "relations") {
                target.constructor[key].push({
                    relation: "oneToOne",
                    dbModel: dbModelClass,
                    targetColumn: columns.modelRow[replaceUnderscore(value)],
                    dbModelColumn: secondTableColumn,
                    relatedModelField: relatedModelProperty,
                });
            }
        });
    };
}