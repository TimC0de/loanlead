import get from "../../../core/decorators/get";
import ReportService from "../services/report_service";

class ReportController {
    public static mappings: Array<{method: string, path: string, callback: (req, res) => any, multipart: boolean}> = [];
    private static reportService: ReportService = new ReportService();

    @get("/reports/:loanId")
    public static findReportsByLoanId(req, res) {
        const loanId: number = req.params.loanId;

        ReportController.reportService.findByLoanId(loanId)
            .then((reports) => {
                res.send(reports);
            });
    }

    @get("/reports/comprehensive")
    public static findComprehensiveReports(req, res) {
        console.log("here");

        const firstDate: string = req.query.firstDate;
        const secondDate: string = req.query.secondDate;

        if (firstDate) {
            if (secondDate) {
                ReportController.reportService.findBetweenDatesOrderByLoanId(firstDate, secondDate)
                    .then((reports) => {
                        res.send(reports);
                    });
            } else {
                res.send("Provide second date please");
            }
        } else {
            res.send("Provide first date please");
        }
    }
}

export default ReportController;