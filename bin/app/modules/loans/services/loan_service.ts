import DBService from "../../../core/dbservice";
import Loan from "../models/loan";
import Dbmodel from "../../../core/dbmodel";

class LoanService extends DBService<Loan> {
    public constructor() {
        super(Loan, Loan.getTableName());
    }

    public mainLoans(page?: number, limit?: number) {
        return this.find(
            {
                "loans.status": {
                    rangeFunction: "notIn",
                    range: [
                        "Rejected",
                        "Disbursed",
                    ],
                },
            },
            "loans.created_at",
            page,
            limit,
        );
    }

    public findByCustomerId(customerId: number) {
        return this.find({
            "loans.customer_id": customerId,
        });
    }

    public findDashboardLoansByStatus(status: string, stage: string, branch: string, page?: number, limit?: number) {
        return this.find(
            Object.assign(
                {
                    "loans.status":
                        status === "received"
                            ? {
                                rangeFunction: "in",
                                range: [ "Received", "Approved", "Created" ],
                            }
                            : {
                                rangeFunction: "in",
                                range: [ "Forwarded", "Deferred" ],
                            },
                    "loans.stage": stage,
                },
                branch !== "Head Office"
                    ? {
                        "users.branch_name": {
                            rangeFunction: "in",
                            range: [ branch, "Head Office" ],
                        },
                    } : {},
            ),
            null,
            page,
            limit,
        );
    }

    public findByStatus(status: string, minDate?: Date, maxDate?: Date, page?: number, limit?: number) {
        let mainOptionsObject = Object.create(null);

        switch (status) {
            case "Running":
                mainOptionsObject = {
                    "loans.status": {
                        conditionOperator: "<>",
                        conditionValue: "Disbursed",
                    },
                };

                break;
            case "Forwarded":
                mainOptionsObject = {
                    "loans.status": "Forwarded",
                };

                break;
            case "Rejected":
                mainOptionsObject = {
                    "loans.status": "Rejected",
                };

                break;
            case "Deferred":
                mainOptionsObject = {
                    "loans.status": "Deferred",
                };

                break;
            case "Disbursed":
                mainOptionsObject = {
                    "loans.status": "Disbursed",
                };

                break;
            case "Received":
                mainOptionsObject = {
                    "loans.status": "Received",
                };

                break;
            default:
                mainOptionsObject = {};

                break;
        }

        return this.find(
            Object.assign(mainOptionsObject, minDate
                ? {
                    "loans.created_at": {
                        rangeFunction: "between",
                        range: [ minDate, maxDate ? maxDate : new Date() ],
                    },
                } : {}),
            null,
            page,
            limit,
        );
    }
}

export default LoanService;