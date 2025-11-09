import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onOpenMenu, onSearch }) {
  const [inputValue, setInputValue] = useState('');

  // Xử lý khi nhấn Enter hoặc nút Kính lúp
  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSearch(inputValue); // Gọi hàm tìm kiếm của App
    }
  };

  return (
    <div className="searchbar-container">
      <button className="menu-button" onClick={onOpenMenu}>☰</button>
      
      <input 
        type="text" 
        placeholder="Tìm kiếm tên đường..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Cập nhật state khi gõ
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} // Bắt phím Enter
      />
      
      <button className="search-button" onClick={handleSubmit}>🔍</button>
    </div>
  );
}

export default SearchBar;