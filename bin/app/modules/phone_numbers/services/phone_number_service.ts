import DBService from "../../../core/dbservice";
import PhoneNumber from "../models/phone_number";

const toSnakeCase = (s: string): string => {
    return s.replace(/[A-Z]/g, (l: string): string => {
        return `_${l.toLowerCase()}`;
    });
};

class PhoneNumberService extends DBService<PhoneNumber> {
    public constructor() {
        super(PhoneNumber, PhoneNumber.getTableName());
    }

    public isUnique(
        phoneNumberType: string,
        phoneNumber: string,
    ) {
        return PhoneNumberService.knex("phone_numbers")
            .where(
                toSnakeCase(phoneNumberType),
                phoneNumber,
            )
            .then((data) => {
                return !data;
            });
    }
}

export default PhoneNumberService;