// src/components/ActionButtons.jsx
import React from 'react';
import './ActionButtons.css';

// Nhận prop 'onOpenReportModal' từ App.jsx
function ActionButtons({ onOpenReportModal }) {
  return (
    <div className="action-buttons-container">
      <button className="locate-button">🛰️</button>
      {/* Khi bấm nút +, gọi hàm mở modal */}
      <button className="report-button" onClick={onOpenReportModal}>+</button>
    </div>
  );
}

export default ActionButtons;