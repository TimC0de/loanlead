import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Role from "../models/role";
import RoleService from "../services/role_service";

class RoleController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
    private static roleService: RoleService = new RoleService();
    
    @get("/roles/")
    public static findAllRoles(req, res): void {
        const page = req.query.page;
        const limit = req.query.limit;

        RoleController.roleService.findAll(page, limit)
            .then((roles) => {
                res.send(roles);
            });
    }

    @get("/roles/count")
    public static findRolesCount(req, res) {
        RoleController.roleService.findCount()
            .then((data) => {
                res.send(data);
            });
    }

    @put("/roles/:id")
    public static triggerSmsNotificationsPossibility(req, res): void {
        const id: number = req.params.id;
        const sendSMS: boolean = req.body.sendSMS;

        RoleController.roleService.triggerSmsNotifications(id, sendSMS)
            .then((roles) => {
                res.send(roles);
            });
    }
}

export default RoleController;