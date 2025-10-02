import React from "react";
import "../pages/DashboardInstagram.css";

const CreatePostModal = ({ isOpen, onClose, onFileSelect }) => {
  if (!isOpen) return null;
  return (
    <div className="ig-modal-overlay">
      <div className="ig-modal">
        <button className="ig-modal-close" onClick={onClose}>&times;</button>
        <div className="ig-modal-content">
          <div className="ig-modal-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="#222"/>
              <path d="M32 22C27.58 22 24 25.58 24 30C24 34.42 27.58 38 32 38C36.42 38 40 34.42 40 30C40 25.58 36.42 22 32 22ZM32 36C28.69 36 26 33.31 26 30C26 26.69 28.69 24 32 24C35.31 24 38 26.69 38 30C38 33.31 35.31 36 32 36Z" fill="#fff"/>
              <circle cx="44" cy="24" r="4" fill="#fff"/>
            </svg>
          </div>
          <div className="ig-modal-title">Drag photos and videos here</div>
          <label className="ig-modal-upload-btn">
            Select From Computer
            <input type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={onFileSelect} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
