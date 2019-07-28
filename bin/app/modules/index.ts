import Controller from "../core/controller";
import BankControllers from "./bank";

BankControllers.forEach((controller) => {
    console.log(controller);
});

console.log(Controller.mappings);

export default Controller.mappings;