import DBService from "../../../core/dbservice";
import LoanType from "../models/loan_type";

class LoanTypeService extends DBService<LoanType> {
    public constructor() {
        super(LoanType, LoanType.getTableName());
    }
}

export default LoanTypeService;