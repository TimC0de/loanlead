import Template from '../templates/template.model';

export default class Message {
    public _id?: number;
    public _phoneNumber?: string;
    public _templateId?: number;
    public _createdAt?: Date;

    public _template?: Template;
}
