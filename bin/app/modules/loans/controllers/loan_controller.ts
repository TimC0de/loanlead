import Controller from "../../../core/controller";
import LoanService from "../services/loan_service";
import get from "../../../core/decorators/get";

class LoanController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];
    private static loanService: LoanService = new LoanService();

    @get("/loans/main")
    public static getMainLoans(req, res) {

    }
}

export default LoanController;