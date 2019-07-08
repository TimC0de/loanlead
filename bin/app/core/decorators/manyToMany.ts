import DBModel from "../dbmodel";

const replaceUnderscore = (s: string): string => {
    return s.replace("_", "");
};

export default function manyToMany<T extends DBModel>(
    relatedModelClass: new (model: { [key: string]: any }) => T,
    bridgeTableRelatedModelColumn: string,
    bridgeTableModelColumn: string,
    bridgeTableName: string,
) {
    return (target, value: string) => {
        Object.keys(target.constructor).forEach((key) => {
            if (key === "manyToManyRelations") {
                target.constructor[key].push({
                    relatedModelClass,
                    bridgeTableRelatedModelColumn,
                    bridgeTableModelColumn,
                    bridgeTableName,
                    relatedModel: replaceUnderscore(value),
                });
            }
        });
    };
}