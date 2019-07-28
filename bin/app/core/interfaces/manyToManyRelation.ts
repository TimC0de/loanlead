import DBModel from "../dbmodel";

export default interface ManyToManyRelation {
    model: DBModel;
    bridgeTableRelatedModelColumn: string;
    bridgeTableModelColumn: string;
    bridgeTableName: string;
    relatedModel: string;
}