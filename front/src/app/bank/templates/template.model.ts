import Role from '../role/role.model';

export default class Template {
    public _id?: number;
    public _type?: string;
    public _stageId?: string;
    public _template?: string;

    public _stage: Role;
}
