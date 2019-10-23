import DBService from "../../../core/dbservice";
import SMSTemplate from "../models/sms_template";

class SMSTemplateService extends DBService<SMSTemplate> {
    public constructor() {
        super(SMSTemplate.prototype);
    }

    public findTemplateFor(entityType: string, stageId: string) {
        return this.find({
            "sms_templates.type": entityType,
            "sms_templates.stage_id": stageId,
        });
    }

    public findCount() {
        return SMSTemplateService.knex(this.table)
            .count("id as count");
    }
}

export default SMSTemplateService;