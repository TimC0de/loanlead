import Controller from "../../../core/controller";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Entity from "../models/entity";
import EntityService from "../services/entity_service";

export default class EntityController extends Controller {
    private static entityService: EntityService = new EntityService();

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
        const entity: Entity = new Entity().assignRequest(req.body);

        EntityController.entityService.add(entity)
            .then((entities) => {
                res.send(entities);
            });
    }

    @put("/entities/:id")
    public static updateEntity(req, res): void {
        const id: number = req.params.id;
        const entity: Entity = new Entity().assignRequest(req.body);

        EntityController.entityService.update(entity, id)
            .then((entities) => {
                res.send(entities);
            });
    }

    @del("/entities/")
    public static deleteEntities(req, res) {
        const id = req.query.id;

        EntityController.entityService.delete(id)
            .then((data) => {
                res.send({
                    deletedRowsNumber: data,
                });
            });
    }

    @get("/entities/unique/:type")
    public static fieldIsUnique(req, res) {
        const type = req.params.type;
        const value = req.query.value;

        EntityController.entityService.isUnique(type, value)
            .then((data: boolean) => {
                res.send({
                    isUnique: data,
                });
            });
    }
}