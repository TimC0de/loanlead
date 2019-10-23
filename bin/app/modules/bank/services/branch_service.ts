import DBService from "../../../core/dbservice";
import Branch from "../models/branch";

class BranchService extends DBService<Branch> {
    public constructor() {
        super(Branch.prototype);
    }

    public findCount() {
        return BranchService.knex(this.table)
            .count("id as count");
    }
}

export default BranchService;