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
            .then((insertedRowsId) => {
                if (insertedRowsId) {
                    EntityController.entityService.findById(insertedRowsId[0])
                        .then((insertedEntities) => {
                            res.send(insertedEntities);
                        });
                }
            });
    }

    @put("/entities/:id")
    public static updateEntity(req, res): void {
        const entity: Entity = DBModel.valueOfRequest<Entity>(req.query, Entity);
        const id: number = req.params.id;

        EntityController.entityService.update(entity, id)
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    EntityController.entityService.findById(id)
                        .then((updatedEntity) => {
                            res.send(updatedEntity);
                        });
                }
            });
    }

    @del("/entities/")
    public static deleteEntities(req, res): void {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        EntityController.entityService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default EntityController;