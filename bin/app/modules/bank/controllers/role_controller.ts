import Controller from "../../../core/controller";
import get from "../../../core/decorators/get";
import put from "../../../core/decorators/put";
import RoleService from "../services/role_service";

export default class RoleController extends Controller {
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