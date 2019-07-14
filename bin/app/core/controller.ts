import DBModel from "./dbmodel";
import DBService from "./dbservice";
import del from "./decorators/delete";
import get from "./decorators/get";
import post from "./decorators/post";
import put from "./decorators/put";

class Controller {
    public mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    // public mappings: Array<{method: string, path: string, callback: (req, res) => any}>;
    // protected service: T;
    // protected model: W;
    //
    // protected constructor(modelClass: new () => W, serviceClass: new () => T) {
    //     this.service = new serviceClass();
    //     this.model = new modelClass();
    // }
    //
    // @get("/users/")
    // public index(req, res) {
    //     this.service.findAll()
    //         .then((data) => {
    //             res.send(data);
    //         });
    // }
    //
    // @get("/users/:id")
    // public findById(req, res) {
    //     const id: number = req.params.id;
    //
    //     this.service.findById(id)
    //         .then((data) => {
    //             res.send(data);
    //         });
    // }
    //
    // @post("/users/")
    // public addUser(req, res) {
    //     const user: W = this.model.parseRequestToModel(req.query);
    //
    //     this.service.add(user)
    //         .then((data) => {
    //             res.send(data);
    //         });
    // }
    //
    // @put("/users/:id")
    // public updateUser(req, res) {
    //     const user: W = this.model.parseRequestToModel(req.query);
    //     const id: number = req.params.id;
    //
    //     this.service.update(user, id)
    //         .then((data) => {
    //             res.send(data);
    //         });
    // }
    //
    // @del("/users")
    // public deleteUsers(req, res) {
    //     const ids: number[] = req.query.id;
    //
    //     this.service.delete(ids)
    //         .then((data) => {
    //             res.send(data);
    //         });
    // }
}

export default Controller;