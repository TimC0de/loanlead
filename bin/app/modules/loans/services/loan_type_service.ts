import DBService from "../../../core/dbservice";
import LoanType from "../models/loan_type";

class LoanTypeService extends DBService<LoanType> {
    public constructor() {
        super(LoanType.prototype);
    }
}

export default LoanTypeService;