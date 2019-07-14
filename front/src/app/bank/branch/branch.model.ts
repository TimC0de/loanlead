import Entity from '../entity/entity.model';

class Branch {
    _id?: number;
    _entityName?: string;
    _name?: string;
    _type?: string;
    _district?: string;
    _town?: string;
    _createdAt?: string;

    _entity?: Entity;
}

export default Branch;
