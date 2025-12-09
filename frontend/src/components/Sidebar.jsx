import React from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <aside className="main-sidebar">
      <div className="user-profile">
        {/* Removed Avatar Group (MR3) */}
        <div className="user-info">
          <div style={{width: '40px', height: '40px', background: '#000', borderRadius: '8px', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', marginBottom:'0.5rem'}}>
            V
          </div>
          <span className="vault-name">Vault</span>
          <span className="user-name">Anurag Yadav</span>
        </div>
      </div>

      <nav className="nav-menu">
        <div className="nav-item">
          <span className="icon">📊</span> Dashboard
        </div>
        <div className="nav-item">
          <span className="icon">👥</span> Nexus
        </div>
        <div className="nav-item">
          <span className="icon">▶️</span> Intake
        </div>

        <div className="nav-section">
          <div className="nav-header">
            <span>Services</span>
            <span className="arrow">^</span>
          </div>
          <div className="sub-menu">
            <div className="sub-item"><span>▶</span> Pre-active</div>
            <div className="sub-item active"><span>|</span> Active</div>
            <div className="sub-item"><span>✖</span> Blocked</div>
            <div className="sub-item"><span>✓</span> Closed</div>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-header">
            <span>Invoices</span>
            <span className="arrow">^</span>
          </div>
          <div className="sub-menu">
            <div className="sub-item bold">Proforma Invoices</div>
            <div className="sub-item">Final Invoices</div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;