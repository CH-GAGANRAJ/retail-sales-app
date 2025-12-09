import '../styles/StatsRow.css';

function StatsRow() {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-header">
          <span>Total units sold</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value">10</div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <span>Total Amount</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value">₹89,000 <span className="sub-text">(19 SRs)</span></div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <span>Total Discount</span>
          <span className="info-icon">ⓘ</span>
        </div>
        <div className="stat-value">₹15,000 <span className="sub-text">(45 SRs)</span></div>
      </div>
    </div>
  );
}

export default StatsRow;