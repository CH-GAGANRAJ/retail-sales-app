import '../styles/SalesTable.css';

function SalesTable({ data }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '8px', cursor: 'pointer', color: '#9ca3af'}}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr style={{ background: '#f9fafb' }}>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer region</th>
            <th>Product ID</th>
            <th>Employee name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.transactionId || Math.random()}>
              <td style={{ color: '#6b7280' }}>{item.transactionId}</td>
              <td>{new Date(item.date).toLocaleDateString('en-CA')}</td>
              <td>{item.customerId}</td>
              <td style={{ fontWeight: '600', color: '#111827' }}>{item.customerName}</td>
              <td style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                {item.phoneNumber} <CopyIcon />
              </td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
              <td style={{ fontWeight: '600' }}>{item.productCategory}</td>
              <td style={{ fontWeight: '600', textAlign: 'center' }}>
                {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
              </td>
              <td style={{ fontWeight: '600', color: '#111827' }}>
                {formatCurrency(item.totalAmount)}
              </td>
              <td>{item.customerRegion}</td>
              <td style={{ fontWeight: '600' }}>{item.productId}</td>
              <td style={{ fontWeight: '600' }}>{item.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;