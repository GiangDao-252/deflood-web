// src/components/MenuSidebar.jsx
import React from 'react';
import Modal from 'react-modal';
import './MenuSidebar.css';

// Không cần setAppElement ở đây nữa vì đã set ở App.jsx

function MenuSidebar({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="menu-sidebar"
      overlayClassName="menu-overlay"
      closeTimeoutMS={300}
    >
      <div className="menu-header">
        <h2>DEFLOOD</h2>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <ul className="menu-list">
        <li>💡 Mẹo ứng phó</li>
        <li>ℹ️ Giới thiệu</li>
        <li>⭐ Đánh giá ứng dụng</li>
        <li>💬 Gửi phản hồi</li>
      </ul>
    </Modal>
  );
}

export default MenuSidebar;