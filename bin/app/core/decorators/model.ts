import DBModel from "../dbmodel";

export default function model(
    dbModel: new <T extends DBModel>(model: { [key: string]: any }) => T
) {
    return (target, value: string) => {

    };
}