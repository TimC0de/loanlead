import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Branch from "../models/branch";
import BranchService from "../services/branch_service";

class BranchController {
    private static branchService: BranchService = new BranchService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

    @get("/branches/")
    public static index(req, res): void {
        BranchController.branchService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/branches/:id")
    public static findById(req, res): void {
        const id: number = req.params.id;

        BranchController.branchService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/branches/")
    public static addBranch(req, res): void {
        const branch: Branch = new Branch().parseRequestToModel(req.params);

        BranchController.branchService.add(branch)
            .then((data) => {
                res.send(data);
            });
    }

    @put("/branches/:id")
    public static updateBranch(req, res): void {
        const branch: Branch = new Branch().parseRequestToModel(req.params);
        const id: number = req.params.id;

        BranchController.branchService.update(branch, id)
            .then((data) => {
                res.send(data);
            });
    }

    @del("/branches/")
    public static deleteBranches(req, res): void {
        const ids: number[] = res.query.id;

        BranchController.branchService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default BranchController;