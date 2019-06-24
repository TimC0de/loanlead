import DBService from "../../../core/dbservice";
import Branch from "../models/branch";

class BranchService extends DBService<Branch> {
    public constructor() {
        super(Branch);
    }
}

export default BranchService;