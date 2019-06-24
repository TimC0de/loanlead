import DBService from "../../../core/dbservice";
import User from "../models/user";

class UserService extends DBService<User> {
    public constructor() {
        super(User);
    }

    public triggerStatus(user: User): User {
        return UserService.knex(this.tableName)
            .where("id", user.id)
            .update({
                status: user.status === "online" ? "offline" : "online",
            })
            .returning("*")
            .then((data) => {
                return new User().parseRowToModel(data.pop());
            })
            .value();
    }

    public findOnlineUsers(): User[] {
        return UserService.knex(this.tableName)
            .where("status", "online")
            .then((data) => {
                data.forEach((row, index) => {
                    data[index] = new User().parseRowToModel(row);
                });

                return data;
            })
            .value();
    }

    public findForwardedUsers(): User[] {
        return UserService.knex({u: "users", l: "loans_state"})
            .select(new User().getFields())
            .where({
                "l.status": "Forwarded",
                "l.actioned_by": "u.employee_id",
            })
            .then((data) => {
                data.forEach((row, index) => {
                    data[index] = new User().parseRowToModel(row);
                });

                return data;
            })
            .value();
    }
}

export default UserService;