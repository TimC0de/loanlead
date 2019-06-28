import DBModel from "../../../core/dbmodel";
import DBService from "../../../core/dbservice";
import User from "../../bank/models/user";
import Report from "../models/report";

class ReportService extends DBService<Report> {
    public constructor() {
        super(Report, Report.getTableName());
    }

    public findByLoanId(loanId: number) {
        return this.find("reports.loan_id", loanId);
    }

    public findBetweenDatesOrderByLoanId(firstDate: string, secondDate: string) {
        console.log(firstDate, secondDate);

        return ReportService.knex(this.tableName)
            .column(["*", {reports_id: "reports.id"}, {users_id: "users.id"}])
            .crossJoin(
                "users", 
                function() {
                    this.on(function() {
                        this
                            .on("reports.actioned_by", "=", "users.employee_id")
                            .andOnBetween(
                                "reports.actioned_at", 
                                [firstDate, secondDate],
                            );
                    });
                })
            .orderBy("reports.loan_id")
            .map((row: {id: number, reports_id: number, users_id: number}) => {
                row.id = row.reports_id;
                
                const report: Report = DBModel.valueOfRow<Report>(row, Report);
                row.id = row.users_id;
                
                report.user = DBModel.valueOfRow<User>(row, User);
                
                return report;
            });
    }
}

export default ReportService;