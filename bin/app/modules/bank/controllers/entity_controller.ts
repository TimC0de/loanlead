import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Entity from "../models/entity";
import EntityService from "../services/entity_service";

class EntityController {
    private static entityService: EntityService = new EntityService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];
    
    @get("/entities/")
    public static index(req, res): void {
        EntityController.entityService.findAll()
            .then((data) => {
                res.send(data);
            });
    }
    
    @get("/entities/:id")
    public static findById(req, res): void {
        EntityController.entityService.findById(req.params.id)
            .then((data) => {
                res.send(data);
            });
    }
    
    @post("/entity")
    public static addEntity(req, res): void {
        EntityController.entityService.add(new Entity().parseRequestToModel(req.params))
            .then((data) => {
                res.send(data);
            });
    }
    
    @put("/entities/:id")
    public static updateEntity(req, res): void {
        EntityController.entityService.update(new Entity().parseRequestToModel(req.params), req.params.id)
            .then((data) => {
                res.send(data);
            });
    }

    @del("/entities/")
    public static deleteEntities(req, res): void {
        console.log(req.params);

        res.send([]);
    }
}

export default EntityController;