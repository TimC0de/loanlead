import DBModel from "../dbmodel";

export default interface Relation {
    relationType: string;
    model: DBModel;
    targetColumn: string;
    relatedColumn: string;
    relatedModelField: string;
}