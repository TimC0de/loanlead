import DBService from "../../../core/dbservice";
import Loan from "../models/loan";

class LoanService extends DBService<Loan> {
    public constructor() {
        super(Loan, Loan.getTableName());
    }

    
}

export default LoanService;