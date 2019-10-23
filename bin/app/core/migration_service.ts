import bcrypt from "bcrypt";
import config from "../config";
import Dbmodel from "./dbmodel";
import DBService from "./dbservice";

const formatDate = (d: Date): string => {
    const month = d.getMonth() + 1 > 9
        ? d.getMonth() + 1
        : `0${d.getMonth() + 1}`;
    
    const date = d.getDate() > 9
        ? d.getDate()
        : `0${d.getDate()}`;
    
    const hours = d.getHours() > 9
        ? d.getHours()
        : `0${d.getHours()}`;
    
    const minutes = d.getMinutes() > 9
        ? d.getMinutes()
        : `0${d.getMinutes()}`;
    
    const seconds = d.getSeconds() > 9
        ? d.getSeconds()
        : `0${d.getSeconds()}`;
    
    return `${d.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

class MigrationService extends DBService<Dbmodel> {
    public constructor() {
        super(Dbmodel.prototype);
    }

    public static migrate() {
        this.encryptPasswords();
    }

    public static encryptPasswords() {
        // logging encryption starting
        console.log(`Starting password encryption: ${formatDate(new Date())}`);

        // generating encryption salt
        bcrypt.genSalt(config.saltRounds)
            .then((salt) => {
                // getting all user records
                this.knex("users")
                    .column("id", "password")
                    .map((
                        row: {id: string, password: string},
                        index: number,
                        length: number,
                    ) => {
                        // creating hash for each user's password
                        bcrypt.hash(row.password, salt)
                            .then((hash) => {
                                this.knex("users")
                                    .update({
                                        password: hash,
                                    })
                                    .where("id", row.id)
                                    .then((updatedRowsCount) => {
                                        if (updatedRowsCount && index === length - 1) {
                                            console.log(`Finishing password encryption: ${formatDate(new Date())}`);
                                        }
                                    });
                            });
                    });
            });
    }
}

export default MigrationService;