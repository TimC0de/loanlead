import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import LoanProduct from "../models/loan_product";
import LoanProductService from "../services/loan_product_service";

class LoanProductController {
    private static loanProductService: LoanProductService = new LoanProductService();
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

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
            .then((insertedRowsId) => {
                if (insertedRowsId) {
                    LoanProductController.loanProductService.findById(insertedRowsId[0])
                        .then((insertedEntities) => {
                            res.send(insertedEntities);
                        });
                }
            });
    }

    @put("/loan_products/:id")
    public static updateLoanProduct(req, res): void {
        const loanProduct: LoanProduct = DBModel.valueOfRequest<LoanProduct>(req.query, LoanProduct);
        const id: number = req.params.id;

        LoanProductController.loanProductService.update(loanProduct, id)
            .then((updatedRowsCount) => {
                if (updatedRowsCount) {
                    LoanProductController.loanProductService.findById(id)
                        .then((updatedLoanProduct) => {
                            res.send(updatedLoanProduct);
                        });
                }
            });
    }

    @del("/loan_products/")
    public static deleteLoanProducts(req, res): void {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        LoanProductController.loanProductService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default LoanProductController;