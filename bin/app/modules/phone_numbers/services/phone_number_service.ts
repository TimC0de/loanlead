import DBService from "../../../core/dbservice";
import PhoneNumber from "../models/phone_number";

const toSnakeCase = (s: string): string => {
    return s.replace(/[A-Z]/g, (l: string): string => {
        return `_${l.toLowerCase()}`;
    });
};

class PhoneNumberService extends DBService<PhoneNumber> {
    public constructor() {
        super(PhoneNumber.prototype);
    }

    public isUnique(value: string) {
        return PhoneNumberService.knex("phone_numbers")
            .where("first_phone_number", value)
            .orWhere("second_phone_number", value)
            .then((data) => {
                return !(data && data.length);
            });
    }
}

export default PhoneNumberService;