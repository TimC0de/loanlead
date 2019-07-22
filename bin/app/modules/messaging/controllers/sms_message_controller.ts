import Controller from "../../../core/controller";
import get from "../../../core/decorators/get";
import SMSMessageService from "../services/sms_message_service";

class SMSMessageController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
    private static smsMessageService: SMSMessageService = new SMSMessageService();

    @get("/sms-messages")
    public static findAllMessages(req, res) {
        const page: number = req.query.page;
        const limit: number = req.query.limit;

        SMSMessageController.smsMessageService.findAll(page, limit)
            .then((data) => {
                res.send(data);
            });
    }

    @get("/sms-messages/count")
    public static findMessagesCount(req, res) {
        SMSMessageController.smsMessageService.findCount()
            .then((data) => {
                res.send(data);
            });
    }

    @get("/sms-messages/:id")
    public static findMessageById(req, res) {
        const id = req.params.id;

        SMSMessageController.smsMessageService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }
}

export default SMSMessageController;