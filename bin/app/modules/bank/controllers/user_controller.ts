import bcrypt from "bcrypt";
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
import config from "../../../config";

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

    @post("/users/login")
    public static login(req, res) {
        const employeeId: string = req.query.employeeId;

        if (employeeId) {
            const password: string = req.query.password;

            UserController.userService.findUserByEmployeeId(employeeId)
                .then((users: User[]) => {
                    if (users) {
                        const user: User = users.pop();

                        if (password) {
                            bcrypt.compare(password, user.password)
                                .then((match) => {
                                    if (match) {
                                        req.session.user = user;

                                        res.send(user);
                                    } else {
                                        res.send("Username or password are wrong");
                                    }
                                });
                        } else {
                            res.send("Please, provide the password");
                        }
                    } else {
                        res.send("Username or password are wrong");
                    }
                });
        } else {
            res.send("Please, provide employeeId");
        }
    }

    @post("/users/register")
    public static registerNewUser(req, res) {
        const user: User =
            DBModel.valueOfRequest<User>(req.query, User);

        user.phoneNumber =
            DBModel.valueOfRequest<PhoneNumber>(req.query, PhoneNumber);

        if (UserController.phoneService.isUnique("firstPhoneNumber", user.phoneNumber.firstPhoneNumber)) {
            res.send("firstPhoneNumber: not unique");
        }

        if (UserController.phoneService.isUnique("secondPhoneNumber", user.phoneNumber.secondPhoneNumber)) {
            res.send("secondPhoneNumber: not unique");
        }

        bcrypt.genSalt(config.saltRounds)
            .then((salt) => {
                bcrypt.hash(user.password, salt)
                    .then((hash) => {
                        UserController.userService.add(user)
                            .then((insertedUsersId) => {
                                if (insertedUsersId) {
                                    res.send("OK");
                                }
                            })
                            .catch((reason) => {
                                res.send("Failed");
                            });
                    });
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