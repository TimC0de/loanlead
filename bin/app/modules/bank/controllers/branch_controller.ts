import Controller from "../../../core/controller";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Branch from "../models/branch";
import BranchService from "../services/branch_service";

export default class BranchController extends Controller {
    private static branchService: BranchService = new BranchService();

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
        const branch: Branch = new Branch().assignRequest(req.body);

        BranchController.branchService.add(branch)
            .then((branches) => {
                res.send(branches);
            });
    }

    @put("/branches/:id")
    public static updateBranch(req, res): void {
        const id: number = req.params.id;
        const branch: Branch = new Branch().assignRequest(req.body);

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