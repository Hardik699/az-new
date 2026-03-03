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
    <div className="w-full bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <div style={{ borderBottom: '1px solid #000', padding: '20px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', margin: '0 0 4px 0' }}>
          {data.companyName}
        </h1>
        <p style={{ fontSize: '11px', color: '#000', margin: '0 0 12px 0', textDecoration: 'underline' }}>
          <a href="#" style={{ color: '#0066cc', textDecoration: 'underline' }}>
            {data.companyAddress}
          </a>
        </p>
        <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', margin: 0 }}>
          Pay Check - {monthName}
        </p>
      </div>

      {/* Employee Details Section */}
      <div style={{ borderBottom: '1px solid #000', padding: '12px 16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ width: '50%', padding: '8px', borderRight: '1px solid #000' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Name:</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.employeeName}</span>
              </td>
              <td style={{ width: '50%', padding: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>UAN No.:</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.uanNo}</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ width: '50%', padding: '8px', borderRight: '1px solid #000' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Department :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.department}</span>
              </td>
              <td style={{ width: '50%', padding: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>ESIC No. :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.esicNo}</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ width: '50%', padding: '8px', borderRight: '1px solid #000' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Designation :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.designation}</span>
              </td>
              <td style={{ width: '50%', padding: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Bank A/C No. :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.bankAccountNo}</span>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ width: '50%', padding: '8px', borderRight: '1px solid #000' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Date Of Joining :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.dateOfJoining}</span>
              </td>
              <td style={{ width: '50%', padding: '8px' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Days In Month :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.daysInMonth}</span>
              </td>
            </tr>
            <tr>
              <td style={{ width: '50%', padding: '8px', borderRight: '1px solid #000' }}>
                <span style={{ fontWeight: 'bold', color: '#000' }}>Employee Code :</span>
                <span style={{ color: '#000', marginLeft: '8px' }}>{data.employeeCode}</span>
              </td>
              <td style={{ width: '50%', padding: '8px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Leave Details Table */}
      <div style={{ borderBottom: '1px solid #000', padding: '12px 16px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', margin: '0 0 8px 0', textAlign: 'center' }}>
          Leave Details
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #000' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #000' }}>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Leave Type</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Total Leave In The Account</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Leave Availed</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>Subsisting Leave</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000' }}>LWP</th>
            </tr>
          </thead>
          <tbody>
            {data.leaves.map((leave, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #000' }}>
                <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{leave.type}</td>
                <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{leave.total.toFixed(1)}</td>
                <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{leave.availed.toFixed(1)}</td>
                <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{leave.subsisting.toFixed(1)}</td>
                <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{leave.lwp.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderBottom: '1px solid #000', fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>Total Leaves Taken -</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{data.totalLeavesTaken.toFixed(1)}</td>
              <td colSpan={2} style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>Total Leave Without Pay -</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{data.totalLeaveWithoutPay.toFixed(1)}</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>Total Present Days -</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{data.totalPresentDays.toFixed(1)}</td>
              <td colSpan={2} style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>Total Days Payable -</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'center' }}>{data.totalDaysPayable.toFixed(1)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Salary Details Table */}
      <div style={{ borderBottom: '1px solid #000', padding: '12px 16px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', margin: '0 0 8px 0', textAlign: 'center' }}>
          Salary Details
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #000' }}>
          <thead>
            <tr style={{ backgroundColor: '#fff', borderBottom: '1px solid #000' }}>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000', width: '25%' }}>Earning</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'right', fontWeight: 'bold', color: '#000', width: '20%' }}>Actual Gross</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'right', fontWeight: 'bold', color: '#000', width: '20%' }}>Earned Gross</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'left', fontWeight: 'bold', color: '#000', width: '20%' }}>Deduction</th>
              <th style={{ border: '1px solid #000', padding: '6px', textAlign: 'right', fontWeight: 'bold', color: '#000', width: '15%' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(data.earnings.length, data.deductions.length) }).map((_, idx) => {
              const earning = data.earnings[idx];
              const deduction = data.deductions[idx];
              return (
                <tr key={idx} style={{ borderBottom: '1px solid #000' }}>
                  <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>
                    {earning?.name || ''}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>
                    {earning ? formatCurrency(earning.actualGross || 0) : ''}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>
                    {earning ? formatCurrency(earning.earnedGross || 0) : ''}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>
                    {deduction?.name || ''}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>
                    {deduction ? formatCurrency(deduction.amount || 0) : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr style={{ borderBottom: '1px solid #000', fontWeight: 'bold' }}>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>Gross Earnings</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>
                {formatCurrency(data.grossEarnings)}
              </td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right' }}>
                {formatCurrency(data.earnedGrossEarnings)}
              </td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000' }}>Gross Deduction</td>
              <td style={{ border: '1px solid #000', padding: '6px', color: '#000', textAlign: 'right', fontWeight: 'bold' }}>
                {formatCurrency(data.totalDeduction)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ border: '1px solid #000', padding: '8px', color: '#000', fontWeight: 'bold', fontSize: '12px' }}>
                Net Salary Credited-
              </td>
              <td colSpan={2} style={{ border: '1px solid #000', padding: '8px', color: '#000', fontWeight: 'bold', fontSize: '13px', textAlign: 'right' }}>
                ₹ {formatCurrency(data.netSalaryCredited)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Amount in Words */}
      <div style={{ borderBottom: '1px solid #000', padding: '12px 16px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#000', margin: 0 }}>
          <span style={{ fontWeight: 'bold' }}>Amount (in words) -</span>
          <span style={{ marginLeft: '8px' }}>{data.amountInWords}</span>
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: '#666', margin: '0 0 8px 0' }}>
          This is a system generated slip
        </p>
      </div>
    </div>
  );
}
