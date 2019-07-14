import bcrypt from "bcrypt";
import config from "../../../config";
import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import multipartRequest from "../../../core/decorators/multipartRequest";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import PhoneNumber from "../../phone_numbers/models/phone_number";
import PhoneNumberService from "../../phone_numbers/services/phone_number_service";
import User from "../models/user";
import UserService from "../services/user_service";

class UserController extends Controller {
    private static userService: UserService = new UserService();
    private static phoneService: PhoneNumberService = new PhoneNumberService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    @get("/users/:type/count")
    public static findTypeCount(req, res) {
        const type: string = req.params.type;

        UserController.userService.findTypeCount(type)
            .then((data: number) => {
                res.send({
                    count: data,
                });
            });
    }

    @get("/users/:type")
    public static findType(req, res) {
        const type: string = req.params.type;
        const page: number = req.query.page;
        const limit: number = req.query.limit;

        UserController.userService.findType(type, page, limit)
            .then((data) => {
                res.send(data);
            });
    }

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

    @multipartRequest()
    @post("/users/")
    public static addUser(req, res) {
        const requestObject: { [key: string]: any } = Object.create(null);

        Object.keys(req.body).forEach((key) => {
            requestObject[key.slice(1)] = req.body[key];
        });

        const user: User = new User(requestObject);

        if (req.files.length) {
            user.picturePath = `assets/images/${req.files[0].filename}`;
        }

        bcrypt.genSalt(config.saltRounds).then((salt) => {
                bcrypt.hash(user.password, salt).then((hash) => {
                        user.password = hash;

                        UserController.userService.add(user)
                            .then((insertedUsers) => {
                                res.send(insertedUsers);
                            })
                            .catch((reason) => {
                                res.send(reason);
                            });
                    });
            });
    }

    @post("/users/login")
    public static login(req, res) {
        const employeeId: string = req.body.employeeId;
        const password: string = req.body.password;

        UserController.userService.findUserByEmployeeId(employeeId)
            .then((users: User[]) => {
                if (users.length) {
                    const user: User = users.pop();

                    if (user.newlyCreated) {
                        res.send({
                            message: "Sorry, your account is not approved yet",
                        });
                    } else {
                        bcrypt.compare(password, user.password)
                            .then((match) => {
                                if (match) {
                                    req.session.user = user;

                                    res.send(user);
                                } else {
                                    res.send({
                                        message: "Please, provide the right username and password",
                                    });
                                }
                            });
                    }
                } else {
                    res.send({
                        message: "Please, provide the right username and password",
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

        UserController.userService.delete(id)
            .then((data) => {
                res.send(data);
            });
    }

    @get("/users/unique/:field")
    public static checkIfFieldIsUnique(req, res) {
        const type: string = req.params.field;
        const value = req.query.value;

        UserController.userService.fieldIsUnique(type, value)
            .then((isUnique) => {
                res.send({
                    isUnique,
                });
            });
    }
}

export default UserController;