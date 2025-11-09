// src/MapCanvas.jsx

import React, { useRef, useEffect } from 'react';
import Map, { Source, Layer } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// ===========================
// 1. CẤU HÌNH STYLE BẢN ĐỒ
// ===========================

// Style cho bản đồ nền OpenTopoMap (OTM)
const otmStyle = {
  version: 8,
  sources: {
    'opentopomap': {
      type: 'raster',
      tiles: [
        'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
        'https://c.tile.opentopomap.org/{z}/{x}/{y}.png'
      ],
      tileSize: 256,
      attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
    }
  },
  layers: [
    {
      id: 'otm-layer',
      type: 'raster',
      source: 'opentopomap',
      minzoom: 0,
      maxzoom: 17
    }
  ]
};

// ===========================
// 2. LOGIC TÔ MÀU (Giả lập AI)
// ===========================

// Dựa vào thuộc tính 'highway' của OpenStreetMap để đoán mức độ ngập
const aiColorLogic = [
  'match',
  ['get', 'highway'],
  'primary', '#d93025',      // Đường chính -> Đỏ (Nguy cơ cao)
  'trunk', '#d93025',        // Đường trục -> Đỏ
  'secondary', '#f9ab00',    // Đường thứ cấp -> Vàng (Nguy cơ vừa)
  'tertiary', '#34a853',     // Đường tam cấp -> Xanh (An toàn)
  'residential', '#34a853',  // Đường dân sinh -> Xanh
  'service', '#34a853',      // Đường nội bộ -> Xanh
  '#9aa0a6' // Màu xám mặc định cho các loại khác
];

// ===========================
// 3. ĐỊNH NGHĨA CÁC LỚP (LAYERS)
// ===========================

// Lớp viền của con đường (vẽ trước, dày hơn, mờ hơn)
const lineLayerOutline = {
  id: 'duong-ai-vien',
  type: 'line',
  filter: ['==', '$type', 'LineString'],
  paint: {
    'line-width': 8,
    'line-color': aiColorLogic,
    'line-opacity': 0.5
  }
};

// Lớp lõi của con đường (vẽ đè lên, mỏng hơn, đậm hơn)
const lineLayerCore = {
  id: 'duong-ai-chinh',
  type: 'line',
  filter: ['==', '$type', 'LineString'],
  paint: {
    'line-width': 4,
    'line-color': aiColorLogic,
    'line-opacity': 1
  }
};

// Lớp điểm báo cáo từ cộng đồng
const pointLayer = {
  id: 'diem-crowd',
  type: 'circle',
  filter: ['==', '$type', 'Point'],
  paint: {
    'circle-radius': 8,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#ffffff',
    // Tô màu điểm dựa trên mức độ báo cáo ('level')
    'circle-color': [
      'match',
      ['get', 'level'],
      'Nang', '#d93025',   // Đỏ
      'Vua', '#f9ab00',    // Vàng
      'AnToan', '#1e8e3e', // Xanh lá đậm
      '#1a73e8'            // Xanh dương mặc định
    ]
  }
};

// ===========================
// 4. COMPONENT CHÍNH
// ===========================

function MapCanvas({ data, onFeatureClick, flyToCoords }) {
  const mapRef = useRef(null);

  // --- HIỆU ỨNG: Bay đến tọa độ mới ---
  useEffect(() => {
    if (flyToCoords && mapRef.current) {
      mapRef.current.flyTo({
        center: flyToCoords,
        zoom: 16,
        speed: 1.5,
        curve: 1.42,
        essential: true
      });
    }
  }, [flyToCoords]);

  // --- XỬ LÝ: Click vào bản đồ ---
  const handleClick = (event) => {
    if (!mapRef.current) return;

    // Kiểm tra xem click có trúng vào layer đường hoặc điểm không
    const features = mapRef.current.queryRenderedFeatures(event.point, {
      layers: ['duong-ai-vien', 'duong-ai-chinh', 'diem-crowd']
    });

    // Nếu có, gửi feature đầu tiên lên App.jsx. Nếu không, gửi null.
    const clickedFeature = features.length > 0 ? features[0] : null;
    onFeatureClick(clickedFeature);
  };

  // --- GIAO DIỆN ---
  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 105.8525, // Trung tâm Hà Nội (Hồ Gươm)
        latitude: 21.0285,
        zoom: 13
      }}
      style={{ width: '100vw', height: '100vh' }}
      mapStyle={otmStyle}
      onClick={handleClick}
      interactiveLayerIds={['duong-ai-vien', 'duong-ai-chinh', 'diem-crowd']} // Báo cho map biết các layer này có thể click
      cursor="pointer" // Hiển thị con trỏ bàn tay khi di chuột vào đường/điểm
    >
      {/* Chỉ vẽ dữ liệu khi 'data' đã sẵn sàng */}
      {data && (
        <Source id="main-data" type="geojson" data={data}>
          <Layer {...lineLayerOutline} />
          <Layer {...lineLayerCore} />
          <Layer {...pointLayer} />
        </Source>
      )}

      {/* Thêm các công cụ điều khiển mặc định (Zoom, La bàn) */}
      {/* <NavigationControl position="top-right" /> */}
    </Map>
  );
}

export default MapCanvas;