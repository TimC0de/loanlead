import DBModel from "../../../core/dbmodel";
import DBService from "../../../core/dbservice";
import PhoneNumber from "../../phone_numbers/models/phone_number";
import User from "../models/user";

class UserService extends DBService<User> {
    public constructor() {
        super(User, User.getTableName());
    }

    public fieldIsUnique(field: string, value) {
        return UserService.knex(this.tableName)
            .where(field, value)
            .then((data) => {
                return !(data && data.length);
            });
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

    public findTypeCount(type: string) {
        let result: Promise<any> = Object.create(null);

        switch (type) {
            case "registered":
                result = this.findCount({
                    "users.newly_created": 1,
                });

                break;
            case "online":
                result = this.findCount({
                    "users.status": "online",
                });

                break;
            default:
                result = this.findCount();

                break;
        }

        return result;
    }

    public findType(type: string, page: number, limit: number) {
        let result: Promise<any> = Object.create(null);

        switch (type) {
            case "registered":
                result = this.find({
                    "users.newly_created": 1,
                }, null, page, limit);

                break;
            case "online":
                result = this.find({
                    "users.status": "online",
                }, null, page, limit);

                break;
            default:
                result = this.find();

                break;
        }

        return result;
    }
}

export default UserService;