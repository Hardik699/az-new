import { Payslip } from "@/components/Payslip";
import AppNav from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface SalaryRecord {
  month: string;
  year?: number;
  basicSalary: number;
  hra: number;
  conveyance: number;
  specialAllowance: number;
  bonus?: number;
  totalSalary: number;
  pf: number;
  esic: number;
  pt: number;
  tds: number;
  retention: number;
  incentive?: number;
  adjustment?: number;
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

// Company Information (Fixed for all payslips)
const COMPANY_NAME = "INFOSEUM IT OPC PVT LTD.";
const COMPANY_ADDRESS = "Imperial Heights -701, Near Akshar Chowk, Atladra, Vadodara-390012,Gujarat";

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

      // Extract component values with fallback calculations
      const basicSalary = record.basicSalary || 0;
      const hra = record.hra || (basicSalary * 0.4);  // Default 40% of basic
      const conveyance = record.conveyance || 1600;  // Default amount
      const specialAllowance = record.specialAllowance || (basicSalary * 0.25);  // Default 25% of basic
      const bonus = record.bonus || 0;
      const incentive = record.incentive || 0;
      const adjustment = record.adjustment || 0;

      // Calculate earned amounts based on working days
      const daysRatio = record.actualWorkingDays / record.totalWorkingDays;

      const basicEarned = basicSalary * daysRatio;
      const hraEarned = hra * daysRatio;
      const conveyanceEarned = conveyance * daysRatio;
      const specialAllowanceEarned = specialAllowance * daysRatio;

      const totalEarningsActual = basicSalary + hra + conveyance + specialAllowance + bonus + incentive + adjustment;
      const totalEarningsEarned = basicEarned + hraEarned + conveyanceEarned + specialAllowanceEarned + bonus + incentive + adjustment;

      // Deductions
      const pf = record.pf || 0;
      const esic = record.esic || 0;
      const pt = record.pt || 0;
      const tds = record.tds || 0;
      const retention = record.retention || 0;
      const totalDeductions = pf + esic + pt + tds + retention;

      return {
        companyName: COMPANY_NAME,
        companyAddress: COMPANY_ADDRESS,
        employeeName: employee.fullName || "N/A",
        uanNo: employee.uanNumber || "N/A",
        department: employee.department || "N/A",
        designation: employee.position || "N/A",
        dateOfJoining: employee.joiningDate || "N/A",
        employeeCode: employee.employeeId || "N/A",
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
          { name: "Basic", actualGross: basicSalary, earnedGross: basicEarned },
          { name: "HRA", actualGross: hra, earnedGross: hraEarned },
          { name: "Conveyance", actualGross: conveyance, earnedGross: conveyanceEarned },
          { name: "Sp. Allowance", actualGross: specialAllowance, earnedGross: specialAllowanceEarned },
          { name: "Bonus", actualGross: bonus, earnedGross: bonus },
          { name: "Incentive", actualGross: incentive, earnedGross: incentive },
          { name: "Adjustment", actualGross: adjustment, earnedGross: adjustment },
        ],
        deductions: [
          { name: "PF", amount: pf },
          { name: "ESIC", amount: esic },
          { name: "PT", amount: pt },
          { name: "TDS", amount: tds },
          { name: "Retention", amount: retention },
        ],
        grossEarnings: totalEarningsActual,
        earnedGrossEarnings: totalEarningsEarned,
        totalDeduction: totalDeductions,
        netSalaryCredited: record.totalSalary,
        month: monthNum,
        year: year,
        amountInWords: numberToWords(Math.round(record.totalSalary)),
      };
    }

    return null;
  };

  const payslipData = getPayslipData();

  if (!payslipData) {
    return (
      <>
        <AppNav />
        <div className="min-h-screen bg-gradient-to-br from-blue-deep-900 via-blue-deep-800 to-slate-900 py-8">
          <div className="w-full max-w-5xl mx-auto px-4">
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
                No Salary Data
              </h1>
            </div>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden p-8">
              <p className="text-center text-gray-700 text-lg">
                Please select a salary record from the Employee Details page to view the payslip.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

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
              onClick={async () => {
                try {
                  const element = document.querySelector('.bg-white.rounded-lg.shadow-2xl');
                  if (!element) {
                    alert('Payslip not found');
                    return;
                  }
                  const canvas = await html2canvas(element as HTMLElement, {
                    scale: 4,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    allowTaint: true,
                    dpi: 300,
                    letterRendering: true
                  });
                  const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'mm',
                    format: 'a4',
                    compress: false
                  });
                  const imgData = canvas.toDataURL('image/png');
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight = pdf.internal.pageSize.getHeight();
                  const canvasWidth = canvas.width;
                  const canvasHeight = canvas.height;
                  const ratio = pdfWidth / canvasWidth;
                  const scaledHeight = canvasHeight * ratio;

                  if (scaledHeight > pdfHeight) {
                    const pageCount = Math.ceil(scaledHeight / pdfHeight);
                    for (let i = 0; i < pageCount; i++) {
                      if (i > 0) pdf.addPage();
                      pdf.addImage(imgData, 'PNG', 0, -i * pdfHeight, pdfWidth, scaledHeight);
                    }
                  } else {
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
                  }

                  const monthName = new Date(payslipData.year, payslipData.month - 1).toLocaleString('default', {
                    month: 'long',
                    year: 'numeric'
                  });
                  pdf.save(`Payslip_${monthName}.pdf`);
                } catch (error) {
                  console.error('Error generating PDF:', error);
                  alert('Failed to generate PDF');
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
