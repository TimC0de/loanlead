import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Branch from "../models/branch";
import BranchService from "../services/branch_service";

class BranchController extends Controller {
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
        const branch: Branch = DBModel.valueOfRequest<Branch>(req.query, Branch);

        BranchController.branchService.add(branch)
            .then((insertedRowsId) => {
                if (insertedRowsId) {
                    BranchController.branchService.findById(insertedRowsId[0])
                        .then((insertedBranches) => {
                            res.send(insertedBranches);
                        });
                }
            });
    }

    @put("/branches/:id")
    public static updateBranch(req, res): void {
        const branch: Branch = DBModel.valueOfRequest<Branch>(req.query, Branch);
        const id: number = req.params.id;

        BranchController.branchService.update(branch, id)
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    BranchController.branchService.findById(id)
                        .then((updatedBranch) => {
                            res.send(updatedBranch);
                        });
                }
            });
    }

    @del("/branches/")
    public static deleteBranches(req, res): void {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        BranchController.branchService.delete(ids)
            .then((data) => {
                res.send({ deletedRows: data });
            });
    }
}

export default BranchController;