import DBModel from "../dbmodel";
import Utils from "../utils";

export default function manyToMany<T extends DBModel>(
    model: T,
    bridgeTableRelatedModelColumn: string,
    bridgeTableModelColumn: string,
    bridgeTableName: string,
) {
    return (target, value: string) => {
        target.manyToManyRelations.push({
            model,
            bridgeTableRelatedModelColumn,
            bridgeTableModelColumn,
            bridgeTableName,
            relatedModel: Utils.replaceUnderscore(value),
        });
    };
}