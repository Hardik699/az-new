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
    <div className="w-full p-0 bg-white" style={{fontFamily: "Arial, Helvetica, sans-serif", lineHeight: '1.5', fontSize: '14px', backgroundColor: '#ffffff'}}>
      <div className="w-full bg-white p-0" style={{fontFamily: "Arial, Helvetica, sans-serif", fontSize: '14px', backgroundColor: '#ffffff'}}>
      {/* Header Section */}
      <div className="border-b border-gray-300">
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold text-black mb-2">{data.companyName}</h1>
          <p className="text-sm text-gray-700 mb-4">{data.companyAddress}</p>
          <p className="text-lg font-semibold text-black">Pay Check - {monthName}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="p-6 border-b border-gray-300">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Name:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.employeeName}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">UAN No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.uanNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Department:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.department}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">ESIC No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.esicNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Designation:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Bank A/C No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.bankAccountNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Date Of Joining:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.dateOfJoining}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Days In Month:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.daysInMonth}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold text-center">Employee Code:</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.employeeCode}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leave Details Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-extrabold text-black mb-3 text-center">Leave Details</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Leave Type</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Total Leave In The Account</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Leave Availed</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Subsisting Leave</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">LWP</th>
            </tr>
          </thead>
          <tbody>
            {data.leaves.map((leave, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{leave.type}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{leave.total.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{leave.availed.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{leave.subsisting.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{leave.lwp.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black text-center">Total Leaves Taken -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.totalLeavesTaken.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-2 text-black text-center">Total Leave Without Pay -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.totalLeaveWithoutPay.toFixed(1)}</td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black text-center">Total Present Days -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.totalPresentDays.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-2 text-black text-center">Total Days Payable -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{data.totalDaysPayable.toFixed(1)}</td>
            </tr>
          </tfoot>
        </table>
      </div>


      {/* Salary Details Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-extrabold text-black mb-3 text-center">Salary Details</h3>
        <table className="w-full text-sm border-collapse mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Earning</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Actual Gross</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Earned Gross</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Deduction</th>
              <th className="border border-gray-300 px-3 py-2 text-center text-black font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.earnings.map((earning, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{earning.name}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{formatCurrency(earning.actualGross || 0)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{formatCurrency(earning.earnedGross || 0)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{idx < data.deductions.length ? data.deductions[idx].name : ""}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{idx < data.deductions.length ? formatCurrency(data.deductions[idx].amount || 0) : ""}</td>
              </tr>
            ))}
            {/* Additional deduction rows if there are more deductions than earnings */}
            {data.deductions.length > data.earnings.length && data.deductions.slice(data.earnings.length).map((deduction, idx) => (
              <tr key={`extra-${idx}`} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-black text-center"></td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center"></td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center"></td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{deduction.name}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-center">{formatCurrency(deduction.amount || 0)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black text-center">Gross Earnings</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{formatCurrency(data.grossEarnings)}</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center">{formatCurrency(data.earnedGrossEarnings)}</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center font-bold">Gross Deduction</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-center font-bold">{formatCurrency(data.totalDeduction)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Net Salary Credited and Amount in Words */}
      <div className="p-6 border-b border-gray-300">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-3 text-black font-bold">Net Salary Credited-</td>
              <td className="border border-gray-300 px-4 py-3 text-right text-black font-bold text-lg">₹ {formatCurrency(data.netSalaryCredited)}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-3 text-black font-bold">Amount (in words) -</td>
              <td className="border border-gray-300 px-4 py-3 text-right text-black">{data.amountInWords}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-6 text-center border-t border-gray-300">
        <img src="https://cdn.builder.io/api/v1/image/assets%2F8012cbea6d4a4d528be55b21ebc4390f%2F5e57f6b47c4249638a8470815ec3ca60?format=webp&width=800&height=1200" alt="Infoseum Logo" className="h-16 mx-auto mb-4" />
        <p className="text-xs text-gray-600">This is a system generated slip</p>
      </div>
      </div>
    </div>
  );
}
