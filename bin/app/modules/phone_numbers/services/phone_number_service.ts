import DBService from "../../../core/dbservice";
import PhoneNumber from "../models/phone_number";

class PhoneNumberService extends DBService<PhoneNumber> {
    public constructor() {
        super(PhoneNumber, PhoneNumber.getTableName());
    }
}

export default PhoneNumberService;