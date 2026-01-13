import React from 'react';
import { createPortal } from 'react-dom';
import '../../styles/InfoModal.css'; // Verified Shell
import '../../styles/FarmersPage.css'; // Internal Styles

const FarmerDetailModal = ({ isOpen, onClose, farmer }) => {
    if (!isOpen || !farmer) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-body">
                    <div className="farmer-modal-inner">

                        <div className="farmer-modal-header">
                            <h2 className="farmer-modal-name">{farmer.name}</h2>
                            <div className="farmer-modal-subtitle">📍 {farmer.region}</div>
                        </div>

                        {/* Image banner inside modal if desired, or just content */}

                        <div className="farmer-stats-grid">
                            <div className="stat-box">
                                <strong>Experience</strong>
                                <span>{farmer.experience}</span>
                            </div>
                            <div className="stat-box">
                                <strong>Land Size</strong>
                                <span>{farmer.landSize}</span>
                            </div>
                        </div>

                        <div className="farmer-full-story">
                            <h4>Their Story</h4>
                            <p>{farmer.story}</p>
                        </div>

                        <div className="farmer-contribution">
                            <p>"{farmer.contribution}"</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') || document.body
    );
};

export default FarmerDetailModal;
