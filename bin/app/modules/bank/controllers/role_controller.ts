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
        RoleController.roleService.findAll()
            .then((roles) => {
                res.send(roles);
            });
    }
    
    @get("/roles/:id")
    public static findRoleById(req, res): void {
        const id: number = req.params.id;
        
        RoleController.roleService.findById(id)
            .then((role) => {
                res.send(role);
            });
    }
    
    @post("/roles/")
    public static addRole(req, res): void {
        const role: Role = DBModel.valueOfRequest<Role>(req.query, Role);

        RoleController.roleService.add(role)
            .then((roles) => {
                res.send(roles);
            });
    }

    @put("/roles/:id")
    public static editRole(req, res): void {
        const role: Role = DBModel.valueOfRequest<Role>(req.query, Role);
        const id: number = req.params.id;

        RoleController.roleService.update(role, id)
            .then((roles) => {
                res.send(roles);
            });
    }

    @put("/roles/:id/sms/:enable")
    public static triggerSmsNotificationsPossibility(req, res): void {
        const id: number = req.params.id;
        const enable: boolean = req.params.enable === "enable";

        RoleController.roleService.triggerSmsNotifications(id, enable)
            .then((roles) => {
                res.send(roles);
            });
    }
}

export default RoleController;