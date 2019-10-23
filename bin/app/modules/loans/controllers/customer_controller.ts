import Controller from "../../../core/controller";
import del from "../../../core/decorators/delete";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
import Customer from "../models/customer";
import CustomerService from "../services/customer_service";

class CustomerController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
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
        const customer: Customer = new Customer({}).assignRequest(req.query);

        CustomerController.customerService.add(customer)
            .then((customers) => {
                res.send(customers);
            });
    }

    @put("/customers/:id")
    public static editCustomer(req, res) {
        const customer: Customer = new Customer({}).assignRequest(req.query);
        const id: number = req.params.id;

        CustomerController.customerService.update(customer, id)
            .then((customers) => {
                res.send(customers);
            });
    }

    @del("/customers")
    public static deleteCustomers(req, res) {
        const id = req.query.id;

        CustomerController.customerService.delete(id)
            .then((data) => {
                res.send(data);
            });
    }
}

export default CustomerController;