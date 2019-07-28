import DBModel from "../dbmodel";
import Utils from "../utils";

export default function oneToMany<T extends DBModel>(
    model: T,
    secondTableColumn: string,
    relatedModelProperty: string,
) {
    return (target, value: string) => {
        const columns: Map<string, string> = target.columns;

        target.relations.push({
            relationType: "oneToOne",
            model,
            targetColumn: columns.get(Utils.replaceUnderscore(value)),
            relatedColumn: secondTableColumn,
            relatedModelField: relatedModelProperty,
        });
    };
}