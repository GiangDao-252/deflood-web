// src/components/InfoSidebar.jsx
import React from 'react';
import Modal from 'react-modal';
import './MenuSidebar.css'; // Tái sử dụng CSS

const getRiskDisplayName = (level) => {
  if (level === 'Nang') return 'Nguy cơ Ngập nặng';
  if (level === 'Vua') return 'Nguy cơ Ngập vừa';
  if (level === 'AnToan') return 'An toàn';
  return 'Chưa có dữ liệu';
};

function InfoSidebar({ isOpen, onClose, feature }) {
  if (!feature) return null;

  const props = feature.properties;
  // Lấy tên đường, ưu tiên 'road_name' (nếu có), nếu không thì lấy 'name' (từ OSM)
  const roadName = props.road_name || props.name || "Đường không tên";
  
  // Lấy thông tin dự báo (nếu có)
  const forecast = props.model_forecast;
  
  // Nếu không có thông tin dự báo, ta sẽ giả lập dựa trên 'highway' (để demo)
  // (Phần này quan trọng vì dữ liệu OSM gốc chưa có 'model_forecast')
  let demoRiskLevel = 'AnToan';
  if (props.highway === 'primary') demoRiskLevel = 'Nang';
  else if (props.highway === 'secondary') demoRiskLevel = 'Vua';

  const displayRisk = forecast ? forecast.risk_level : demoRiskLevel;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="menu-sidebar"
      overlayClassName="menu-overlay"
      closeTimeoutMS={300}
    >
      <div className="menu-header">
        <h2 style={{ color: '#333', fontSize: '1.5rem' }}>{roadName}</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      
      <div className="info-body">
        <h3>Thông tin Cảnh báo</h3>
        
        <div className="info-block">
          <h4>🤖 DỰ BÁO (TỪ AI)</h4>
          <p><strong>Tình trạng:</strong> {getRiskDisplayName(displayRisk)}</p>
          <p><strong>Loại đường:</strong> {props.highway || 'Không rõ'}</p>
        </div>

        <div className="info-block">
          <h4>👨‍👩‍👦 CỘNG ĐỒNG BÁO</h4>
          <p>Chưa có báo cáo nào từ cộng đồng.</p>
        </div>
      </div>
    </Modal>
  );
}

export default InfoSidebar;