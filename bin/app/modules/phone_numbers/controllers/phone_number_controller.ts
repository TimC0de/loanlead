import Controller from "../../../core/controller";
import Dbmodel from "../../../core/dbmodel";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import put from "../../../core/decorators/put";
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

        const phoneNumber: PhoneNumber = Dbmodel.valueOfRequest(requestObject, PhoneNumber);
        
        PhoneNumberController.phoneNumberService.add(phoneNumber)
            .then((data) => {
                res.send(data);
            });
    }
}

export default PhoneNumberController;