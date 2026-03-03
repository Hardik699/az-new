import { Payslip } from "@/components/Payslip";
import AppNav from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SalaryRecord {
  month: string;
  year?: number;
  basicSalary: number;
  hra: number;
  conveyance: number;
  specialAllowance: number;
  bonus: number;
  totalSalary: number;
  pf: number;
  esic: number;
  pt: number;
  tds: number;
  retention: number;
  actualWorkingDays: number;
  totalWorkingDays: number;
  createdAt: string;
}

interface Employee {
  fullName: string;
  uanNumber?: string;
  department: string;
  position: string;
  dateOfJoining?: string;
  _id?: string;
  esic?: string;
  accountNumber?: string;
}

function numberToWords(num: number): string {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convert(n: number): string {
    if (n === 0) return "";
    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + convert(n % 10000000) : "");
  }

  return convert(num) + " Rupees only";
}

export default function PayslipPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { record, employee } = location.state || {};

  // Build payslip data from employee and salary record
  const getPayslipData = () => {
    if (record && employee) {
      const monthDate = new Date(record.month + "-01");
      const year = record.year || monthDate.getFullYear();
      const monthNum = parseInt(record.month.split("-")[1] || record.month);

      const totalEarnings = record.basicSalary + (record.hra || 0) + (record.conveyance || 0) + (record.specialAllowance || 0) + (record.bonus || 0);
      const totalDeductions = (record.pf || 0) + (record.esic || 0) + (record.pt || 0) + (record.tds || 0) + (record.retention || 0);

      return {
        companyName: "Company HR System",
        companyAddress: "Your Company Address",
        employeeName: employee.fullName || "N/A",
        uanNo: employee.uanNumber || "N/A",
        department: employee.department || "N/A",
        designation: employee.position || "N/A",
        dateOfJoining: employee.dateOfJoining || "N/A",
        employeeCode: employee._id?.slice(-4) || "N/A",
        esicNo: employee.esic || "N/A",
        bankAccountNo: employee.accountNumber || "N/A",
        daysInMonth: record.totalWorkingDays || 30,
        leaves: [
          { type: "PL", total: 0, availed: 0, subsisting: 0, lwp: 0 },
          { type: "CL", total: 0, availed: 0, subsisting: 0, lwp: 0 },
          { type: "SL", total: 0, availed: 0, subsisting: 0, lwp: 0 },
        ],
        totalLeavesTaken: 0,
        totalLeaveWithoutPay: record.totalWorkingDays - record.actualWorkingDays,
        totalPresentDays: record.actualWorkingDays,
        totalDaysPayable: record.actualWorkingDays,
        earnings: [
          { name: "Basic", actualGross: record.basicSalary, earnedGross: (record.basicSalary / record.totalWorkingDays) * record.actualWorkingDays },
          { name: "HRA", actualGross: record.hra || 0, earnedGross: ((record.hra || 0) / record.totalWorkingDays) * record.actualWorkingDays },
          { name: "Conveyance", actualGross: record.conveyance || 0, earnedGross: ((record.conveyance || 0) / record.totalWorkingDays) * record.actualWorkingDays },
          { name: "Sp. Allowance", actualGross: record.specialAllowance || 0, earnedGross: ((record.specialAllowance || 0) / record.totalWorkingDays) * record.actualWorkingDays },
          { name: "Bonus", actualGross: record.bonus || 0, earnedGross: record.bonus || 0 },
        ],
        deductions: [
          { name: "PF", amount: record.pf || 0 },
          { name: "ESIC", amount: record.esic || 0 },
          { name: "PT", amount: record.pt || 0 },
          { name: "TDS", amount: record.tds || 0 },
          { name: "Retention", amount: record.retention || 0 },
        ],
        grossEarnings: totalEarnings,
        earnedGrossEarnings: record.totalSalary + totalDeductions,
        totalDeduction: totalDeductions,
        netSalaryCredited: record.totalSalary,
        month: monthNum,
        year: year,
        amountInWords: numberToWords(Math.floor(record.totalSalary)),
      };
    }

    // Fallback sample data
    return {
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
  };

  const payslipData = getPayslipData();
  const monthName = new Date(payslipData.year, payslipData.month - 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

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
              Pay Check - {monthName}
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
