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
    <div className="w-full p-0 bg-white" style={{fontFamily: "Arial, Helvetica, sans-serif", lineHeight: '1.5', fontSize: '14px'}}>
      <div className="w-full bg-white p-0" style={{fontFamily: "Arial, Helvetica, sans-serif", fontSize: '14px'}}>
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
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Name:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.employeeName}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">UAN No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.uanNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Department:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.department}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">ESIC No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.esicNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Designation:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.designation}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Bank A/C No.:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.bankAccountNo}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Date Of Joining:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.dateOfJoining}</td>
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Days In Month:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.daysInMonth}</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black font-bold">Employee Code:</td>
              <td className="border border-gray-300 px-3 py-2 text-black">{data.employeeCode}</td>
              <td colSpan={2}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leave Details Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-extrabold text-black mb-3">Leave Details</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Leave Type</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Total Leave In The Account</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Leave Availed</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Subsisting Leave</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">LWP</th>
            </tr>
          </thead>
          <tbody>
            {data.leaves.map((leave, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-black">{leave.type}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{leave.total.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{leave.availed.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{leave.subsisting.toFixed(1)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{leave.lwp.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black">Total Leaves Taken -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{data.totalLeavesTaken.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-2 text-black text-right">Total Leave Without Pay -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{data.totalLeaveWithoutPay.toFixed(1)}</td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black">Total Present Days -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{data.totalPresentDays.toFixed(1)}</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-2 text-black text-right">Total Days Payable -</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{data.totalDaysPayable.toFixed(1)}</td>
            </tr>
          </tfoot>
        </table>
      </div>


      {/* Earnings Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-extrabold text-black mb-3">Earnings</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Earning</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-black font-bold">Actual Gross</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-black font-bold">Earned Gross</th>
            </tr>
          </thead>
          <tbody>
            {data.earnings.map((earning, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2 text-black">{earning.name}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(earning.actualGross || 0)}</td>
                <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(earning.earnedGross || 0)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black">Gross Earnings</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(data.grossEarnings)}</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(data.earnedGrossEarnings)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Deductions Section */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-lg font-extrabold text-black mb-4">Deductions</h3>
        <div className="grid grid-cols-3 gap-4">
          {data.deductions.map((deduction, idx) => (
            <div key={idx} className="border border-gray-300">
              <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
                <p className="text-sm font-semibold text-black">{deduction.name}</p>
              </div>
              <div className="px-3 py-3 text-black font-medium">
                {formatCurrency(deduction.amount || 0)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Net Salary Credited and Amount in Words */}
      <div className="p-6 border-b border-gray-300">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="border-b border-gray-300">
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
