import DBService from "../../../core/dbservice";
import SecurityType from "../models/security_type";

class SecurityTypeService extends DBService<SecurityType> {
    public constructor() {
        super(SecurityType, SecurityType.getTableName());
    }
}

export default SecurityTypeService;