import DBModel from "../dbmodel";

export default interface Relation {
    model: DBModel;
    targetColumn: string;
    relatedColumn: string;
    relatedModelField: string;
}