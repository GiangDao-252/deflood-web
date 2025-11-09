// src/components/ReportModal.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import './ReportModal.css';

const customStyles = {
  content: {
    top: '50%', left: '50%', right: 'auto', bottom: 'auto',
    marginRight: '-50%', transform: 'translate(-50%, -50%)',
    width: 'calc(100% - 40px)', maxWidth: '500px',
    borderRadius: '15px', padding: '0', border: 'none',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.6)', zIndex: 30 },
};

function ReportModal({ isOpen, onClose, onSubmit }) {
  const [level, setLevel] = useState('Vua');

  const handleSubmit = () => {
    onSubmit(level);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} closeTimeoutMS={200}>
      <div className="report-modal">
        <div className="report-header">
          <h3>Báo cáo Tình trạng Ngập</h3>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        <div className="report-body">
          <p>Chọn mức độ ngập tại vị trí của bạn:</p>
          <div className="level-options">
            <label className={`level-option ${level === 'Nang' ? 'selected' : ''}`}>
              <input type="radio" name="level" value="Nang" checked={level === 'Nang'} onChange={(e) => setLevel(e.target.value)} />
              <span className="icon">⛔</span> Ngập nặng
            </label>
            <label className={`level-option ${level === 'Vua' ? 'selected' : ''}`}>
              <input type="radio" name="level" value="Vua" checked={level === 'Vua'} onChange={(e) => setLevel(e.target.value)} />
              <span className="icon">⚠️</span> Ngập vừa
            </label>
            <label className={`level-option ${level === 'AnToan' ? 'selected' : ''}`}>
              <input type="radio" name="level" value="AnToan" checked={level === 'AnToan'} onChange={(e) => setLevel(e.target.value)} />
              <span className="icon">✅</span> An toàn
            </label>
          </div>
        </div>
        <div className="report-footer">
          <button onClick={onClose} className="cancel-button">Hủy</button>
          <button onClick={handleSubmit} className="submit-button">Gửi Báo cáo</button>
        </div>
      </div>
    </Modal>
  );
}

export default ReportModal;