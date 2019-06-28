import DBService from "../../../core/dbservice";
import Role from "../models/role";

class RoleService extends DBService<Role> {
    public constructor() {
        super(Role, Role.getTableName());
    }

    public triggerSmsNotifications(id: number, enable: boolean) {
        return RoleService.knex(this.tableName)
            .update({
                send_sms: enable,
            });
    }
}

export default RoleService;