interface PayslipData {
  // Header Info
  companyName: string;
  companyAddress: string;
  
  // Employee Details
  employeeName: string;
  uanNo: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  employeeCode: string;
  esicNo: string;
  bankAccountNo: string;
  daysInMonth: number;
  
  // Leave Details
  leaves: {
    type: string;
    total: number;
    availed: number;
    subsisting: number;
    lwp: number;
  }[];
  totalLeavesTaken: number;
  totalLeaveWithoutPay: number;
  totalPresentDays: number;
  totalDaysPayable: number;
  
  // Salary Details
  earnings: {
    name: string;
    actualGross: number;
    earnedGross: number;
  }[];
  deductions: {
    name: string;
    amount: number;
  }[];
  grossEarnings: number;
  earnedGrossEarnings: number;
  totalDeduction: number;
  netSalaryCredited: number;
  
  // Additional Info
  month: number;
  year: number;
  amountInWords: string;
}

export function Payslip({ data }: { data: PayslipData }) {
  const monthName = new Date(data.year, data.month - 1).toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="w-full p-0 bg-white" style={{fontFamily: "Arial, Helvetica, sans-serif", lineHeight: '1.3', fontSize: '12px', backgroundColor: '#ffffff'}}>
      <div className="w-full bg-white p-0" style={{fontFamily: "Arial, Helvetica, sans-serif", fontSize: '12px', backgroundColor: '#ffffff', lineHeight: '1.3'}}>
      {/* Header Section */}
      <div className="border-b border-gray-300">
        <div className="p-3 text-center">
          <h1 className="text-3xl font-bold text-black mb-1">{data.companyName}</h1>
          <p className="text-xs text-gray-700 mb-2">{data.companyAddress}</p>
          <p className="text-base font-semibold text-black">Pay Check - {monthName}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="p-3 border-b border-gray-300">
        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Name:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.employeeName}</td>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">UAN No.:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.uanNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Department:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.department}</td>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">ESIC No.:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.esicNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Designation:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.designation}</td>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Bank A/C No.:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.bankAccountNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Date Of Joining:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.dateOfJoining}</td>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Days In Month:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.daysInMonth}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-2 py-1 text-black font-bold text-center">Employee Code:</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.employeeCode}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leave Details Table */}
      <div className="p-3 border-b border-gray-300">
        <h3 className="text-sm font-extrabold text-black mb-1 text-center">Leave Details</h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Leave Type</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Total Leave</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Availed</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Subsisting</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">LWP</th>
            </tr>
          </thead>
          <tbody>
            {data.leaves.map((leave, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1 text-black text-center">{leave.type}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center">{leave.total.toFixed(1)}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center">{leave.availed.toFixed(1)}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center">{leave.subsisting.toFixed(1)}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center">{leave.lwp.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50 text-xs">
              <td className="border border-gray-300 px-2 py-1 text-black text-center">Total Taken -</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.totalLeavesTaken.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-2 py-1 text-black text-center">Without Pay -</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.totalLeaveWithoutPay.toFixed(1)}</td>
            </tr>
            <tr className="font-bold bg-gray-50 text-xs">
              <td className="border border-gray-300 px-2 py-1 text-black text-center">Present Days -</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.totalPresentDays.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-2 py-1 text-black text-center">Payable Days -</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{data.totalDaysPayable.toFixed(1)}</td>
            </tr>
          </tfoot>
        </table>
      </div>


      {/* Salary Details Table */}
      <div className="p-3 border-b border-gray-300">
        <h3 className="text-sm font-extrabold text-black mb-1 text-center">Salary Details</h3>
        <table className="w-full text-xs border-collapse mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Earning</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Actual</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Earned</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Deduction</th>
              <th className="border border-gray-300 px-2 py-1 text-center text-black font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.earnings.map((earning, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{earning.name}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{formatCurrency(earning.actualGross || 0)}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{formatCurrency(earning.earnedGross || 0)}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{idx < data.deductions.length ? data.deductions[idx].name : ""}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{idx < data.deductions.length ? formatCurrency(data.deductions[idx].amount || 0) : ""}</td>
              </tr>
            ))}
            {/* Additional deduction rows if there are more deductions than earnings */}
            {data.deductions.length > data.earnings.length && data.deductions.slice(data.earnings.length).map((deduction, idx) => (
              <tr key={`extra-${idx}`} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs"></td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs"></td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs"></td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{deduction.name}</td>
                <td className="border border-gray-300 px-2 py-1 text-black text-center text-xs">{formatCurrency(deduction.amount || 0)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50 text-xs">
              <td className="border border-gray-300 px-2 py-1 text-black text-center">Gross Earnings</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{formatCurrency(data.grossEarnings)}</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center">{formatCurrency(data.earnedGrossEarnings)}</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center font-bold">Deduction</td>
              <td className="border border-gray-300 px-2 py-1 text-black text-center font-bold">{formatCurrency(data.totalDeduction)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Net Salary Credited and Amount in Words */}
      <div className="p-3 border-b border-gray-300">
        <table className="w-full text-xs border-collapse">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold">Net Salary Credited-</td>
              <td className="border border-gray-300 px-2 py-1 text-right text-black font-bold">₹ {formatCurrency(data.netSalaryCredited)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1 text-black font-bold">Amount (in words) -</td>
              <td className="border border-gray-300 px-2 py-1 text-right text-black text-xs">{data.amountInWords}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-2 text-center border-t border-gray-300">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F8012cbea6d4a4d528be55b21ebc4390f%2F5e57f6b47c4249638a8470815ec3ca60?format=webp&width=800&height=1200" alt="Infoseum Logo" className="h-12 mx-auto mb-2" />
        <p className="text-xs text-gray-600">This is a system generated slip</p>
      </div>
      </div>
    </div>
  );
}
