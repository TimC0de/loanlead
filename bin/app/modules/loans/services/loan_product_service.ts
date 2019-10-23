import DBService from "../../../core/dbservice";
import LoanProduct from "../models/loan_product";

class LoanProductService extends DBService<LoanProduct> {
    public constructor() {
        super(LoanProduct.prototype);
    }
}

export default LoanProductService;