import { Payslip } from "@/components/Payslip";
import AppNav from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PayslipPage() {
  const navigate = useNavigate();

  // Sample data from the PDF
  const payslipData = {
    companyName: "INFOSEUM IT OPC PVT LTD.",
    companyAddress: "Imperial Heights -701, Near Akshar Chowk, Atladra, Vadodara-390012,Gujarat",
    
    employeeName: "HARDIK uyuftu",
    uanNo: "15218810654",
    department: "IT & ADMINISTRATION",
    designation: "Associate - IT & Administration",
    dateOfJoining: "21.04.2025",
    employeeCode: "1455",
    esicNo: "N/A",
    bankAccountNo: "50100725455754",
    daysInMonth: 30,
    
    leaves: [
      { type: "PL", total: 0.0, availed: 0.0, subsisting: 0.0, lwp: 0.0 },
      { type: "CL", total: 0.0, availed: 2.0, subsisting: -2.0, lwp: 2.0 },
      { type: "SL", total: 0.0, availed: 0.0, subsisting: 0.0, lwp: 0.0 },
    ],
    totalLeavesTaken: 2.0,
    totalLeaveWithoutPay: 2.0,
    totalPresentDays: 28.0,
    totalDaysPayable: 28.0,
    
    earnings: [
      { name: "Basic", actualGross: 11850.00, earnedGross: 11060.00 },
      { name: "HRA", actualGross: 4740.00, earnedGross: 4424.00 },
      { name: "Conveyance", actualGross: 1600.00, earnedGross: 1493.33 },
      { name: "Sp. Allowance", actualGross: 5510.00, earnedGross: 5142.67 },
      { name: "Incentive", actualGross: 0.00, earnedGross: 0.00 },
      { name: "Adjustment", actualGross: 0.00, earnedGross: 0.00 },
    ],
    deductions: [
      { name: "PF", amount: 1800 },
      { name: "ESIC", amount: 0 },
      { name: "PT", amount: 200 },
      { name: "TDS", amount: 0 },
      { name: "Advance Any", amount: 0 },
      { name: "Retention", amount: 1500 },
    ],
    
    grossEarnings: 23700.00,
    earnedGrossEarnings: 22120.00,
    totalDeduction: 3500.0,
    netSalaryCredited: 18620.00,
    
    month: 6,
    year: 2025,
    amountInWords: "Eighteen Thousand Six Hundred Twenty Rupees only",
  };

  return (
    <>
      <AppNav />
      <div className="min-h-screen bg-gradient-to-br from-blue-deep-900 via-blue-deep-800 to-slate-900 py-8">
        <div className="w-full max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-slate-300 hover:text-white hover:bg-slate-700/50"
              title="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Pay Check - June'2025
            </h1>
          </div>

          {/* Payslip Container */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <Payslip data={payslipData} />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center mt-8">
            <Button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Print Payslip
            </Button>
            <Button
              variant="outline"
              className="text-white border-slate-600 hover:bg-slate-700"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
