// src/App.jsx

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// --- IMPORT CÁC COMPONENT CON ---
import MapCanvas from './MapCanvas';
import SearchBar from './components/SearchBar';
import ActionButtons from './components/ActionButtons';
import LegendButton from './components/LegendButton';
import MenuSidebar from './components/MenuSidebar';
import ReportModal from './components/ReportModal';
import InfoSidebar from './components/InfoSidebar';

// Import file CSS chung cho App
import './App.css';

// Thiết lập phần tử gốc cho Modal để hỗ trợ accessibility (quan trọng!)
// Nó báo cho thư viện biết đâu là phần nội dung chính cần bị làm mờ khi popup hiện ra.
Modal.setAppElement('#root');

function App() {
  // =======================
  // 1. QUẢN LÝ TRẠNG THÁI (STATE)
  // =======================

  // Dữ liệu bản đồ (GeoJSON)
  const [data, setData] = useState(null);

  // Con đường đang được chọn (để hiển thị InfoSidebar)
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Tọa độ để bản đồ "bay" tới (khi tìm kiếm thành công)
  const [flyToCoords, setFlyToCoords] = useState(null);

  // Trạng thái đóng/mở của Menu Sidebar
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Trạng thái đóng/mở của Popup Báo cáo
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // =======================
  // 2. CÁC HIỆU ỨNG (EFFECTS)
  // =======================

  // Tải dữ liệu "thật" khi ứng dụng vừa mở lên
  useEffect(() => {
    console.log("🚀 Đang tải dữ liệu bản đồ...");
    fetch('/Hanoi_Roads_4326.geojson') // File này phải nằm trong thư mục /public
      .then(response => {
        if (!response.ok) throw new Error("Không tìm thấy file GeoJSON!");
        return response.json();
      })
      .then(geojsonData => {
        console.log("✅ Đã tải xong dữ liệu:", geojsonData.features.length, "features");
        setData(geojsonData);
      })
      .catch(error => console.error("❌ Lỗi tải dữ liệu:", error));
  }, []);

  // =======================
  // 3. CÁC HÀM XỬ LÝ (HANDLERS)
  // =======================

  // Xử lý khi người dùng tìm kiếm
  const handleSearch = (searchTerm) => {
    if (!data || !searchTerm.trim()) return;

    // Tìm feature đầu tiên có tên khớp với từ khóa (không phân biệt hoa/thường)
    const foundFeature = data.features.find(f => 
      f.properties.name && 
      f.properties.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundFeature && foundFeature.geometry.coordinates) {
      console.log("🔍 Tìm thấy:", foundFeature.properties.name);
      
      // Lấy tọa độ điểm đầu tiên của con đường để làm điểm đích
      const targetCoords = foundFeature.geometry.coordinates[0];
      
      setFlyToCoords(targetCoords); // Kích hoạt hiệu ứng bay
      setSelectedFeature(foundFeature); // Mở sidebar thông tin luôn
    } else {
      alert(`Không tìm thấy đường nào có tên: "${searchTerm}"`);
    }
  };

  // Xử lý khi người dùng gửi báo cáo ngập (Demo)
  const handleSubmitReport = (level) => {
    console.log("📝 Người dùng báo cáo mức:", level);
    
    // Tạo một điểm mới (Demo: lấy tọa độ cố định gần Hồ Gươm)
    const newReport = {
      type: "Feature",
      geometry: { 
        type: "Point", 
        coordinates: [105.8525, 21.0285] 
      },
      properties: {
        source: "user_report",
        level: level,
        timestamp: new Date().toISOString()
      }
    };

    // Cập nhật lại dữ liệu bản đồ để hiển thị điểm mới
    setData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        features: [...prevData.features, newReport]
      };
    });
  };

  // =======================
  // 4. GIAO DIỆN (RENDER)
  // =======================
  return (
    <div className="app-container">
      {/* --- CÁC THÀNH PHẦN NỔI (FLOATING UI) --- */}
      
      {/* Thanh tìm kiếm: Nhận hàm mở menu và hàm tìm kiếm */}
      <SearchBar 
        onOpenMenu={() => setIsMenuOpen(true)}
        onSearch={handleSearch}
      />
      
      {/* Nút hành động: Nhận hàm mở popup báo cáo */}
      <ActionButtons 
        onOpenReportModal={() => setIsReportModalOpen(true)} 
      />
      
      {/* Nút chú giải */}
      <LegendButton />

      {/* --- BẢN ĐỒ NỀN --- */}
      {/* Nhận dữ liệu, hàm xử lý click, và tọa độ bay */}
      <MapCanvas 
        data={data} 
        onFeatureClick={setSelectedFeature}
        flyToCoords={flyToCoords}
      />

      {/* --- CÁC POPUP & SIDEBAR (Mặc định ẩn) --- */}
      
      <MenuSidebar 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
      
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleSubmitReport}
      />
      
      {/* Chỉ hiện InfoSidebar khi có một feature đang được chọn */}
      <InfoSidebar 
        isOpen={!!selectedFeature} 
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature} 
      />
    </div>
  );
}

export default App;