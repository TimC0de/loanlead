import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import User from "../models/user";
import UserService from "../services/user_service";

class UserController {
    private static userService: UserService = new UserService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}>;

    @get("/users/")
    public static index(req, res) {
        UserController.userService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/users/:id")
    public static findById(req, res) {
        UserController.userService.findById(req.params.id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/users/")
    public static addUser(req, res) {
        const user: User = new User().parseRequestToModel(req.params);

        UserController.userService.add(user)
            .then((data) => {
                res.send(data);
            });
    }

    @put("/users/:id")
    public static updateUser(req, res) {
        const user: User = new User().parseRequestToModel(req.params);

        UserController.userService.update(user, req.params.id)
            .then((data) => {
                res.send(data);
            });
    }

    @del("/users")
    public static deleteUsers(req, res) {
        
    }
}

export default UserController;