import Controller from "../../../core/controller";
import SMSTemplateService from "../services/sms_template_service";
import get from "../../../core/decorators/get";
import post from "../../../core/decorators/post";
import SMSTemplate from "../models/sms_template";
import put from "../../../core/decorators/put";
import del from "../../../core/decorators/delete";

const replaceUnderscore = (s: string): string => s.replace("_", "");

class SMSTemplateController extends Controller {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
    private static smsTemplateService: SMSTemplateService = new SMSTemplateService();

    @get("/sms-templates")
    public static findAllTemplates(req, res) {
        const page: number = req.query.page;
        const limit: number = req.query.limit;

        SMSTemplateController.smsTemplateService.findAll(page, limit)
            .then((data) => {
                res.send(data);
            });
    }

    @get("/sms-templates/count")
    public static findTemplatesCount(req, res) {
        SMSTemplateController.smsTemplateService.findCount()
            .then((data) => {
                res.send(data);
            });
    }
    
    @get("/sms-templates/:id")
    public static findTemplateById(req, res) {
        const id = req.params.id;
        
        SMSTemplateController.smsTemplateService.findById(id)
            .then((data) => {
                res.send(data);
            });
    }
    
    @post("/sms-templates")
    public static addSMSTemplate(req, res) {
        const requestObject: { [key: string]: any } = Object.create(null);
        
        Object.keys(req.body).forEach((key) => {
            requestObject[replaceUnderscore(key)] = req.body[key];
        });

        const smsTemplate: SMSTemplate = new SMSTemplate(requestObject);

        SMSTemplateController.smsTemplateService.add(smsTemplate)
            .then((data) => {
                res.send(data);
            });
    }

    @put("/sms-templates/:id")
    public static updateSMSTemplate(req, res) {
        const id: number = req.params.id;
        const requestObject: { [key: string]: any } = Object.create(null);

        Object.keys(req.body).forEach((key) => {
            requestObject[replaceUnderscore(key)] = req.body[key];
        });

        const smsTemplate: SMSTemplate = new SMSTemplate(requestObject);

        SMSTemplateController.smsTemplateService.update(smsTemplate, id)
            .then((data) => {
                res.send(data);
            });
    }

    @del("/sms-templates")
    public static deleteSMSTemplate(req, res) {
        const id: number = req.query.id;

        SMSTemplateController.smsTemplateService.delete(id)
            .then((data) => {
                res.send({
                    deletedRowsCount: data,
                });
            });
    }
}

export default SMSTemplateController;