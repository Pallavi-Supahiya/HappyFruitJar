import React from 'react';
import { createPortal } from 'react-dom';
import '../../styles/InfoModal.css';

const InfoModal = ({ isOpen, onClose, content }) => {
    if (!isOpen || !content) return null;

    // Close on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <div className="modal-icon-circle">
                        {/* We might pass icon here if needed, or just use image */}
                        <span>ℹ️</span>
                    </div>
                    <h2>{content.title}</h2>
                </div>

                <div className="modal-body">
                    {/* Placeholder for image if we had real ones */}
                    {/* <img src={content.image} alt={content.title} className="modal-image" /> */}

                    <p className="modal-description">{content.description}</p>

                    {content.benefits && (
                        <div className="modal-benefits">
                            <h3>Benefits:</h3>
                            <ul>
                                {content.benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') || document.body
    );
};

export default InfoModal;
