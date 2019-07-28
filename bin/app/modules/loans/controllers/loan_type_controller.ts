import Dbmodel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import LoanType from "../models/loan_type";
import LoanTypeService from "../services/loan_type_service";

class LoanTypeController {
    private static loanTypeService: LoanTypeService = new LoanTypeService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    @get("/loan_types/")
    public static index(req, res): void {
        LoanTypeController.loanTypeService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/loan_types/:id")
    public static findById(req, res): void {
        const id: number = req.params.id;

        LoanTypeController.loanTypeService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/loan_types")
    public static addLoanType(req, res): void {
        const loanType: LoanType = Dbmodel.valueOfRequest<LoanType>(req.query, LoanType);

        LoanTypeController.loanTypeService.add(loanType)
            .then((loanTypes) => {
                res.send(loanTypes);
            });
    }

    @put("/loan_types/:id")
    public static updateLoanType(req, res): void {
        const loanType: LoanType = Dbmodel.valueOfRequest<LoanType>(req.query, LoanType);
        const id: number = req.params.id;

        LoanTypeController.loanTypeService.update(loanType, id)
            .then((loanTypes) => {
                res.send(loanTypes);
            });
    }

    @del("/loan_types/")
    public static deleteLoanTypes(req, res): void {
        const id = req.query.id;

        LoanTypeController.loanTypeService.delete(id)
            .then((data) => {
                res.send(data);
            });
    }
}

export default LoanTypeController;