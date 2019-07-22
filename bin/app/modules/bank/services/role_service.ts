import DBService from "../../../core/dbservice";
import Role from "../models/role";

class RoleService extends DBService<Role> {
    public constructor() {
        super(Role, Role.getTableName());
    }

    public findCount() {
        return RoleService.knex(this.tableName)
            .count("id as count");
    }

    public triggerSmsNotifications(id: number, sendSMS: boolean) {
        return RoleService.knex(this.tableName)
            .where("id", id)
            .update({
                send_sms: sendSMS,
            })
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    return this.findById(id);
                }
            });
    }
}

export default RoleService;