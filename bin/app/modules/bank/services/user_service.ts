import DBModel from "../../../core/dbmodel";
import DBService from "../../../core/dbservice";
import PhoneNumber from "../../phone_numbers/models/phone_number";
import User from "../models/user";

class UserService extends DBService<User> {
    public constructor() {
        super(User, User.getTableName());
    }

    public test() {
        this.find();
    }

    public triggerStatus(user: User) {
        return UserService.knex(this.tableName)
            .where("id", user.id)
            .update({
                status: user.status === "online" ? "offline" : "online",
            });
    }

    public findOnlineUsers() {
        return UserService.knex(this.tableName)
            .where("status", "online")
            .map((row) => DBModel.valueOfRow<User>(row, User));
    }

    public findForwardedUsers() {
        return UserService.knex({u: "users", l: "loans_state"})
            .select(DBModel.getFields<User>("row", User))
            .where({
                "l.status": "Forwarded",
                "l.actioned_by": "u.employee_id",
            })
            .map((row) => DBModel.valueOfRow<User>(row, User));
    }

    public findUserByEmployeeId(employeeId: string) {
        return this.find({
            "users.employee_id": employeeId,
        });
    }
}

export default UserService;