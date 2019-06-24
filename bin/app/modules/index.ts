import BankControllers from "./bank";

const controllers = BankControllers;
let mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];

controllers.forEach((controller) => {
    mappings = mappings.concat(controller.mappings);
});

export default mappings;