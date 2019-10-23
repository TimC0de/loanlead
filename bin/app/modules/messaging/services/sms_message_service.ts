import request from "request";
import config from "../../../config";
import DBService from "../../../core/dbservice";
import User from "../../bank/models/user";
import UserService from "../../bank/services/user_service";
import Customer from "../../loans/models/customer";
import Loan from "../../loans/models/loan";
import SMSMessage from "../models/sms_message";
import SMSTemplate from "../models/sms_template";
import SMSTemplateService from "./sms_template_service";

const formatDate = (d: Date): string => {
    const month = d.getMonth() + 1 > 9
        ? d.getMonth() + 1
        : `0${d.getMonth() + 1}`;

    const day = d.getDate() > 9
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

    return `${d.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

class SMSMessageService extends DBService<SMSMessage> {
    private userService: UserService = new UserService();
    private smsTemplateService: SMSTemplateService = new SMSTemplateService();

    public constructor() {
        super(SMSMessage.prototype);
    }

    public findCount() {
        return SMSMessageService.knex(this.table)
            .count("id as count");
    }

    public sendMessage(entityType: string, loan: Loan) {
        DBService.knex("sms_counter")
            .then((data: Array<{ id: number, messages_count: number }>) => {
                if (data.length) {
                    const messagesCount: number = data.pop().messages_count;

                    if (messagesCount) {
                        const optionsObject: { [key: string]: string } = {
                            sender: config.messageSender,
                            username: config.messageUsername,
                            password: config.messagePassword,
                        };

                        switch (entityType) {
                            case "user":
                                this.userService.findNotifiableUsersByBranchAndStage(loan.user.branch.name, loan.user.role.name)
                                    .map((user: User) => {
                                        this.smsTemplateService.findTemplateFor("user", user.role.name)
                                            .then((templates: SMSTemplate[]) => {
                                                if (templates.length) {
                                                    optionsObject.message = templates.pop().template
                                                        .replace("%FORWARD_TIMESTAMP%", formatDate(loan.stagedAt));
                                                } else {
                                                    optionsObject.message = `The loan was forwarded to you at ${formatDate(loan.stagedAt)}`;
                                                }

                                                const phoneNumber = user.phoneNumber.firstPhoneNumber;

                                                optionsObject.contacts = `256${
                                                    phoneNumber.startsWith("0")
                                                        ? phoneNumber.slice(1)
                                                        : phoneNumber
                                                }`;

                                                let url = `${config.messageBaseURL}?`;

                                                Object.keys(optionsObject).forEach((key, index) => {
                                                    url += `${index ? "&" : ""}${key}=${optionsObject[key]}`;
                                                });

                                                request
                                                    .get(url, (error, response, body) => {
                                                        if (parseInt(body, 10) === 400) {
                                                            this.add(new SMSMessage({
                                                                phoneNumber: user.phoneNumber.firstPhoneNumber,
                                                                templateId: templates.length ? templates.pop().id : 1,
                                                            }));
                                                        }
                                                    });
                                            });
                                    });

                                break;
                            case "customer":
                                const customer: Customer = loan.customer;

                                this.smsTemplateService.findTemplateFor("customer", loan.user.role.name)
                                    .then((templates: SMSTemplate[]) => {
                                        if (templates.length) {
                                            optionsObject.message = templates[0].template
                                                .replace("%FORWARD_TIMESTAMP%", formatDate(loan.stagedAt));
                                        } else {
                                            optionsObject.message = `The loan was forwarded to you at ${formatDate(loan.stagedAt)}`;
                                        }

                                        const phoneNumber = customer.phoneNumber.firstPhoneNumber;

                                        optionsObject.contacts = `256${
                                            phoneNumber.startsWith("0")
                                                ? phoneNumber.slice(1)
                                                : phoneNumber
                                        }`;

                                        let url = `${config.messageBaseURL}?`;

                                        Object.keys(optionsObject).forEach((key, index) => {
                                            url += `${index ? "&" : ""}${key}=${optionsObject[key]}`;
                                        });

                                        request
                                            .get(url, (error, response, body) => {
                                                if (parseInt(body, 10) === 400) {
                                                    this.add(new SMSMessage({
                                                        phoneNumber: customer.phoneNumber.firstPhoneNumber,
                                                        templateId: templates.length ? templates.pop().id : 1,
                                                    }));
                                                }
                                            });
                                    });

                                break;
                        }
                    }
                }
            });
    }
}

export default SMSMessageService;