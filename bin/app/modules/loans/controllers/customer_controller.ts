import DBModel from "../../../core/dbmodel";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Customer from "../models/customer";
import CustomerService from "../services/customer_service";

class CustomerController {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];
    private static customerService: CustomerService = new CustomerService();

    @get("/customers/")
    public static findAllCustomers(req, res) {
        const document: string = req.query.document;

        if (document) {
            CustomerController.customerService.findByDocument(document)
                .then((customers) => {
                    res.send(customers);
                });
        } else {
            CustomerController.customerService.findAll()
                .then((customers) => {
                    res.send(customers);
                });
        }
    }

    @get("/customers/:id")
    public static findCustomerById(req, res) {
        const id: number = req.params.id;

        CustomerController.customerService.findById(id)
            .then((customer) => {
                res.send(customer);
            });
    }

    @post("/customers")
    public static addCustomer(req, res) {
        const customer: Customer = DBModel.valueOfRequest<Customer>(req.query, Customer);

        CustomerController.customerService.add(customer)
            .then((insertedCustomerId) => {
                if (insertedCustomerId) {
                    CustomerController.customerService.findById(insertedCustomerId[0])
                        .then((insertedCustomer) => {
                            res.send(insertedCustomer);
                        });
                }
            });
    }

    @put("/customers/:id")
    public static editCustomer(req, res) {
        const customer: Customer = DBModel.valueOfRequest<Customer>(req.query, Customer);
        const id: number = req.params.id;

        CustomerController.customerService.update(customer, id)
            .then((updatedCustomersCount) => {
                if (updatedCustomersCount) {
                    CustomerController.customerService.findById(id)
                        .then((updatedCustomer) => {
                            res.send(updatedCustomer);
                        });
                }
            });
    }

    @del("/customers")
    public static deleteCustomers(req, res) {
        const id = req.query.id;
        let ids: number[] = [];

        if (req.query.id) {
            ids = typeof id === "string" ? ids.concat(parseInt(id, 10)) : ids.concat(ids);
        } else {
            res.send({ message: "No id specified" });
        }

        CustomerController.customerService.delete(ids)
            .then((data) => {
                res.send(data);
            });
    }
}

export default CustomerController;