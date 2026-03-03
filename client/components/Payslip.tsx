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
    <div className="w-full p-0 bg-white" style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", lineHeight: '1.4'}}>
      <div className="w-full bg-white p-0" style={{fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}}>
      {/* Header Section */}
      <div className="border-b border-gray-300">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-black mb-2">{data.companyName}</h1>
          <p className="text-sm text-gray-700 mb-4">{data.companyAddress}</p>
          <p className="text-lg font-semibold text-black">Pay Check - {monthName}</p>
        </div>
      </div>

      {/* Employee Details Section */}
      <div className="p-6 border-b border-gray-300">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <span className="font-bold text-black">Name:</span>
            <span className="text-black ml-2">{data.employeeName}</span>
          </div>
          <div>
            <span className="font-bold text-black">UAN No.:</span>
            <span className="text-black ml-2">{data.uanNo}</span>
          </div>
          
          <div>
            <span className="font-bold text-black">Department :</span>
            <span className="text-black ml-2">{data.department}</span>
          </div>
          <div>
            <span className="font-bold text-black">ESIC No. :</span>
            <span className="text-black ml-2">{data.esicNo}</span>
          </div>
          
          <div>
            <span className="font-bold text-black">Designation :</span>
            <span className="text-black ml-2">{data.designation}</span>
          </div>
          <div>
            <span className="font-bold text-black">Bank A/C No. :</span>
            <span className="text-black ml-2">{data.bankAccountNo}</span>
          </div>
          
          <div>
            <span className="font-bold text-black">Date Of Joining :</span>
            <span className="text-black ml-2">{data.dateOfJoining}</span>
          </div>
          <div>
            <span className="font-bold text-black">Days In Month :</span>
            <span className="text-black ml-2">{data.daysInMonth}</span>
          </div>
          
          <div>
            <span className="font-bold text-black">Employee Code :</span>
            <span className="text-black ml-2">{data.employeeCode}</span>
          </div>
        </div>
      </div>

      {/* Leave Details Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-sm font-bold text-black mb-3">Leave Details</h3>
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

      {/* Salary Details Table */}
      <div className="p-6 border-b border-gray-300">
        <h3 className="text-sm font-bold text-black mb-3">Salary Details</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Earning</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-black font-bold">Actual Gross</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-black font-bold">Earned Gross</th>
              <th className="border border-gray-300 px-3 py-2 text-left text-black font-bold">Deduction</th>
              <th className="border border-gray-300 px-3 py-2 text-right text-black font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(data.earnings.length, data.deductions.length) }).map((_, idx) => {
              const earning = data.earnings[idx];
              const deduction = data.deductions[idx];
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-black">
                    {earning?.name || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-black text-right">
                    {earning ? formatCurrency(earning.actualGross || 0) : ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-black text-right">
                    {earning ? formatCurrency(earning.earnedGross || 0) : ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-black">
                    {deduction?.name || ''}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-black text-right">
                    {deduction ? formatCurrency(deduction.amount || 0) : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td className="border border-gray-300 px-3 py-2 text-black">Gross Earnings</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(data.grossEarnings)}</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right">{formatCurrency(data.earnedGrossEarnings)}</td>
              <td className="border border-gray-300 px-3 py-2 text-black">Gross Deduction</td>
              <td className="border border-gray-300 px-3 py-2 text-black text-right font-bold">{formatCurrency(data.totalDeduction)}</td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td colSpan={3} className="border border-gray-300 px-3 py-3 text-black font-bold">Net Salary Credited-</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-3 text-black font-bold text-right text-lg">₹ {formatCurrency(data.netSalaryCredited)}</td>
            </tr>
            <tr className="font-bold bg-gray-50">
              <td colSpan={3} className="border border-gray-300 px-3 py-3 text-black font-bold">Amount (in words) -</td>
              <td colSpan={2} className="border border-gray-300 px-3 py-3 text-black font-bold text-right">{data.amountInWords}</td>
            </tr>
          </tfoot>
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
