import DBService from "../../../core/dbservice";
import Branch from "../models/branch";

class BranchService extends DBService<Branch> {
    public constructor() {
        super(Branch, Branch.getTableName());
    }

    public findCount() {
        return BranchService.knex(this.tableName)
            .count("id as count");
    }
}

export default BranchService;