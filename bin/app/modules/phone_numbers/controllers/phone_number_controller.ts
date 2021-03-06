import Controller from "../../../core/controller";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import PhoneNumber from "../models/phone_number";
import PhoneNumberService from "../services/phone_number_service";

class PhoneNumberController extends Controller {
    private static phoneNumberService: PhoneNumberService = new PhoneNumberService();
    
    @get("/phone_numbers/")
    public static checkIfUnique(req, res) {
        const phoneNumber: string = req.query.phoneNumber;

        PhoneNumberController.phoneNumberService.isUnique(phoneNumber)
            .then((isUnique: boolean) => {
                res.send({
                    isUnique,
                });
            });
    }
    
    @post("/phone_numbers/")
    public static addPhoneNumber(req, res) {
        const requestObject: { [key: string]: any } = Object.create(null);

        Object.keys(req.body).forEach((key) => {
            requestObject[key.slice(1)] = req.body[key];
        });

        const phoneNumber: PhoneNumber = new PhoneNumber({}).assignRequest(requestObject);
        
        PhoneNumberController.phoneNumberService.add(phoneNumber)
            .then((data) => {
                res.send(data);
            });
    }
}

export default PhoneNumberController;