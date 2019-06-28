import Controller from "../../../core/controller";
import DBModel from "../../../core/dbmodel";
import get from "../../../core/decorators/get";
import put from "../../../core/decorators/put";
import PhoneNumber from "../models/phone_number";
import PhoneNumberService from "../services/phone_number_service";

class PhoneNumberController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any}> = [];
    private static phoneNumberService: PhoneNumberService = new PhoneNumberService();
    
    @get("/phone_numbers/:id")
    public static findById(req, res) {
        const id: number = req.params.id;
        
        PhoneNumberController.phoneNumberService.findById(id)
            .then((phoneNumber) => {
                res.send(phoneNumber);
            });
    }
    
    @put("/phone_numbers/:id")
    public static updatePhoneNumber(req, res) {
        const id: number = req.params.id;
        const phoneNumber: PhoneNumber = DBModel.valueOfRequest<PhoneNumber>(req.query, PhoneNumber);
        
        PhoneNumberController.phoneNumberService.update(phoneNumber, id)
            .then((updatedRowId) => {
                if (updatedRowId) {
                    PhoneNumberController.phoneNumberService.findById(id)
                        .then((updatedPhoneNumber) => {
                            res.send(updatedPhoneNumber);
                        });
                }
            });
    }
}

export default PhoneNumberController;