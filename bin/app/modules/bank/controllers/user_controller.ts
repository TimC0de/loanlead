import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import PhoneNumber from "../../phone_numbers/models/phone_number";
import PhoneNumberService from "../../phone_numbers/services/phone_number_service";
import User from "../models/user";
import UserService from "../services/user_service";

class UserController extends Controller {
    private static userService: UserService = new UserService();
    private static phoneService: PhoneNumberService = new PhoneNumberService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

    @get("/users/")
    public static index(req, res) {
        UserController.userService.findAll()
            .then((users) => {
                res.send(users);
            });
    }

    @get("/users/:id")
    public static findById(req, res) {
        const id: number = req.params.id;

        UserController.userService.findById(id)
            .then((users: User[]) => {
                res.send(users);
            });
    }

    @post("/users/")
    public static addUser(req, res) {
        const user: User = DBModel.valueOfRequest<User>(req.query, User);

        UserController.userService.add(user)
            .then((insertedRowsId) => {
                if (insertedRowsId) {
                    UserController.userService.findById(insertedRowsId[0])
                        .then((insertedUsers) => {
                            res.send(insertedUsers);
                        });
                }
            });
    }

    @put("/users/:id")
    public static updateUser(req, res) {
        const user: User = DBModel.valueOfRequest<User>(req.query, User);
        const id: number = req.params.id;

        UserController.userService.update(user, id)
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    UserController.userService.findById(id)
                        .then((updatedUser) => {
                            res.send(updatedUser);
                        });
                }
            });
    }

    @del("/users")
    public static deleteUsers(req, res) {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        UserController.userService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default UserController;