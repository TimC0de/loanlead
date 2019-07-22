import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Branch from "../models/branch";
import BranchService from "../services/branch_service";

const replaceUnderscore = (s: string): string => {
    return s.replace("_", "");
};

class BranchController extends Controller {
    private static branchService: BranchService = new BranchService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    @get("/branches/")
    public static index(req, res) {
        const page: number = req.query.page;
        const limit: number = req.query.limit;

        BranchController.branchService.findAll(page, limit)
            .then((data) => {
                res.send(data);
            });
    }

    @get("/branches/count")
    public static findBranchesCount(req, res) {
        BranchController.branchService.findCount()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/branches/:id")
    public static findById(req, res) {
        const id: number = req.params.id;

        BranchController.branchService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/branches/")
    public static addBranch(req, res): void {
        const requestBody: { [key: string]: any } = Object.create(null);
        
        Object.keys(req.body).forEach((key) => {
            requestBody[replaceUnderscore(key)] = req.body[key];
        });

        const branch: Branch = new Branch(requestBody);

        BranchController.branchService.add(branch)
            .then((branches) => {
                res.send(branches);
            });
    }

    @put("/branches/:id")
    public static updateBranch(req, res): void {
        const id: number = req.params.id;
        const requestBody: { [key: string]: any } = Object.create(null);

        Object.keys(req.body).forEach((key) => {
            requestBody[replaceUnderscore(key)] = req.body[key];
        });

        const branch: Branch = new Branch(requestBody);

        BranchController.branchService.update(branch, id)
            .then((branches) => {
                res.send(branches);
            });
    }

    @del("/branches/")
    public static deleteBranches(req, res): void {
        const id = req.query.id;

        BranchController.branchService.delete(id)
            .then((data) => {
                res.send({
                    deletedRowsNumber: data,
                });
            });
    }
}

export default BranchController;