import Controller from "../core/controller";
import BankControllers from "./bank";
import LoansControllers from "./loans";
import PhoneNumberController from "./phone_numbers/controllers/phone_number_controller";

const controllers = (BankControllers as Controller[])
    .concat(PhoneNumberController)
    .concat(LoansControllers);

let mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

controllers.forEach((controller) => {
    mappings = mappings.concat(controller.mappings);
});

export default mappings;