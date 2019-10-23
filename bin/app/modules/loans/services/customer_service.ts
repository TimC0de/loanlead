import DBService from "../../../core/dbservice";
import Customer from "../models/customer";

class CustomerService extends DBService<Customer> {
    public constructor() {
        super(Customer.prototype);
    }

    public findLoansCount(customerId: number) {
        return CustomerService.knex("loans")
            .count("*")
            .where("customer_id", customerId)
            .groupBy("customer_id");
    }

    public findByDocument(document: string) {
        return this.find({
            "customers.document": document,
        });
    }
}

export default CustomerService;