import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Entity from "../models/entity";
import EntityService from "../services/entity_service";

class EntityController extends Controller {
    private static entityService: EntityService = new EntityService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    @get("/entities/")
    public static index(req, res): void {
        EntityController.entityService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/entities/:id")
    public static findById(req, res): void {
        const id: number = req.params.id;

        EntityController.entityService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/entities")
    public static addEntity(req, res): void {
        const entity: Entity = DBModel.valueOfRequest<Entity>(req.query, Entity);

        EntityController.entityService.add(entity)
            .then((entities) => {
                res.send(entities);
            });
    }

    @put("/entities/:id")
    public static updateEntity(req, res): void {
        const entity: Entity = DBModel.valueOfRequest<Entity>(req.query, Entity);
        const id: number = req.params.id;

        EntityController.entityService.update(entity, id)
            .then((entities) => {
                res.send(entities);
            });
    }

    @del("/entities/")
    public static deleteEntities(req, res): void {
        const id = req.query.id;

        EntityController.entityService.delete(id)
            .then((data) => {
                res.send(data);
            });
    }
}

export default EntityController;