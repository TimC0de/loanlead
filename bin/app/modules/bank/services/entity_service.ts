import DBService from "../../../core/dbservice";
import Entity from "../models/entity";

class EntityService extends DBService<Entity> {
    public constructor() {
        super(Entity.prototype);
    }

    public isUnique(type: string, value: string) {
        return EntityService.knex("entities")
            .where(type, value)
            .then((data) => {
                return !(data && data.length);
            });
    }
}

export default EntityService;