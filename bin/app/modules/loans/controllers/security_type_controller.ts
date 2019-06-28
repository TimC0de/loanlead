import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import SecurityType from "../models/security_type";
import SecurityTypeService from "../services/security_type_service";

class SecurityTypeController {
    private static securityTypeService: SecurityTypeService = new SecurityTypeService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

    @get("/security_types/")
    public static index(req, res): void {
        SecurityTypeController.securityTypeService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/security_types/:id")
    public static findById(req, res): void {
        const id: number = req.params.id;

        SecurityTypeController.securityTypeService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/security_types")
    public static addSecurityType(req, res): void {
        const securityType: SecurityType = DBModel.valueOfRequest<SecurityType>(req.query, SecurityType);

        SecurityTypeController.securityTypeService.add(securityType)
            .then((insertedRowsId) => {
                if (insertedRowsId) {
                    SecurityTypeController.securityTypeService.findById(insertedRowsId[0])
                        .then((insertedEntities) => {
                            res.send(insertedEntities);
                        });
                }
            });
    }

    @put("/security_types/:id")
    public static updateSecurityType(req, res): void {
        const securityType: SecurityType = DBModel.valueOfRequest<SecurityType>(req.query, SecurityType);
        const id: number = req.params.id;

        SecurityTypeController.securityTypeService.update(securityType, id)
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    SecurityTypeController.securityTypeService.findById(id)
                        .then((updatedSecurityType) => {
                            res.send(updatedSecurityType);
                        });
                }
            });
    }

    @del("/security_types/")
    public static deleteSecurityTypes(req, res): void {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        SecurityTypeController.securityTypeService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default SecurityTypeController;