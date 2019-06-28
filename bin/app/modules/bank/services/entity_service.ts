import DBService from "../../../core/dbservice";
import Entity from "../models/entity";

class EntityService extends DBService<Entity> {
    public constructor() {
        super(Entity, Entity.getTableName());
    }
}

export default EntityService;