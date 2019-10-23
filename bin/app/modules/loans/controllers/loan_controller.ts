import Controller from "../../../core/controller";
import get from "../../../core/decorators/get";
import LoanService from "../services/loan_service";

class LoanController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
    private static loanService: LoanService = new LoanService();

    @get("/")
    public static test(req, res) {
        LoanController.loanService.mainLoans()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/loans/main")
    public static getMainLoans(req, res) {
        /*
         @TODO get main loans
         */
    }
}

export default LoanController;