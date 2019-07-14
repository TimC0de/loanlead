import Role from '../role/role.model';
import Branch from '../branch/branch.model';
import PhoneNumber from '../../phone-number/phone-number.model';

class User {
    _id?: number;
    _employeeId?: string;
    _roleName?: string;
    _branchName?: string;
    _phoneNumbersId?: number;
    _password?: string;
    _fullName?: string;
    _email?: string;
    _status?: string;
    _picturePath?: string;
    _receiveSms?: boolean;
    _updatedAt?: Date;
    _statusChangeTimestamp?: Date;
    _createdAt?: Date;
    _newlyCreated?: boolean;

    _phoneNumber?: PhoneNumber;
    _role?: Role;
    _branch?: Branch;
}

export default User;
