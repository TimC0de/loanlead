import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import LoanProduct from "../models/loan_product";
import LoanProductService from "../services/loan_product_service";

class LoanProductController {
    private static loanProductService: LoanProductService = new LoanProductService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];

    @get("/loan_products/")
    public static index(req, res): void {
        LoanProductController.loanProductService.findAll()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/loan_products/:id")
    public static findById(req, res): void {
        const id: number = req.params.id;

        LoanProductController.loanProductService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }

    @post("/loan_products")
    public static addLoanProduct(req, res): void {
        const loanProduct: LoanProduct = DBModel.valueOfRequest<LoanProduct>(req.query, LoanProduct);

        LoanProductController.loanProductService.add(loanProduct)
            .then((loanProducts) => {
                res.send(loanProducts);
            });
    }

    @put("/loan_products/:id")
    public static updateLoanProduct(req, res): void {
        const loanProduct: LoanProduct = DBModel.valueOfRequest<LoanProduct>(req.query, LoanProduct);
        const id: number = req.params.id;

        LoanProductController.loanProductService.update(loanProduct, id)
            .then((loanProducts) => {
                res.send(loanProducts);
            });
    }

    @del("/loan_products/")
    public static deleteLoanProducts(req, res): void {
        const id = req.query.id;

        LoanProductController.loanProductService.delete(id)
            .then((data) => {
                res.send(data);
            });
    }
}

export default LoanProductController;