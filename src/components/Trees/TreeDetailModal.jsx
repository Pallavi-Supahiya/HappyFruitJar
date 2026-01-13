import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { farmersData } from '../../data/farmers';
import '../../styles/InfoModal.css'; // Reuse Shell Styles
import '../../styles/TreeDetailModal.css'; // Internal Styles

const TreeDetailModal = ({ isOpen, onClose, tree, onGetStarted }) => {
    const [currentImg, setCurrentImg] = useState(0);

    if (!isOpen || !tree) return null;

    const farmer = farmersData.find(f => f.id === tree.farmerId);
    const gallery = tree.gallery && tree.gallery.length > 0 ? tree.gallery : [tree.image];

    // Reset gallery on open (effect could act here, but simple init is fine if key changes or we reset on close)
    // For now, simpler is better.

    const nextImage = () => setCurrentImg((prev) => (prev + 1) % gallery.length);
    const prevImage = () => setCurrentImg((prev) => (prev - 1 + gallery.length) % gallery.length);

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
                    <span className="tree-brand-tag" style={{ display: 'block', marginBottom: '5px' }}>{tree.type}</span>
                    <h2>{tree.name}</h2>
                </div>

                <div className="modal-body">
                    <div className="tree-modal-inner">
                        <div className="tree-modal-grid">

                            {/* Gallery Section */}
                            <div className="tree-modal-gallery-wrapper">
                                <div className="gallery-main">
                                    <img src={gallery[currentImg]} alt={tree.name} className="tree-modal-image" />

                                    {gallery.length > 1 && (
                                        <>
                                            <button className="gallery-arrow left" onClick={prevImage}>&#10094;</button>
                                            <button className="gallery-arrow right" onClick={nextImage}>&#10095;</button>
                                        </>
                                    )}
                                </div>
                                {gallery.length > 1 && (
                                    <div className="gallery-dots">
                                        {gallery.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`gallery-dot ${currentImg === idx ? 'active' : ''}`}
                                                onClick={() => setCurrentImg(idx)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="tree-modal-specs">
                                    <div className="modal-spec-item">
                                        <span className="modal-spec-label">Region</span>
                                        <span>📍 {tree.region}</span>
                                    </div>
                                    <div className="modal-spec-item">
                                        <span className="modal-spec-label">Yield</span>
                                        <span>⚖️ {tree.yield}</span>
                                    </div>
                                    <div className="modal-spec-item">
                                        <span className="modal-spec-label">Harvest</span>
                                        <span>🗓️ {tree.harvestWindow}</span>
                                    </div>
                                    <div className="modal-spec-item">
                                        <span className="modal-spec-label">Availability</span>
                                        <span style={{ color: '#8BC34A', fontWeight: 'bold' }}>In Stock</span>
                                    </div>
                                </div>

                                <div className="tree-modal-description">
                                    <h4>About this Tree</h4>
                                    <p>{tree.description}</p>

                                    {/* Farmer Highlight */}
                                    {farmer && (
                                        <div className="modal-farmer-highlight">
                                            <img src={farmer.image} alt={farmer.name} className="highlight-farmer-img" />
                                            <div>
                                                <h5>Meet the Farmer</h5>
                                                <p>Grown by <strong>{farmer.name}</strong> in {farmer.region}. <br />
                                                    <small>{farmer.experience} Experience</small></p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Link to Full Farmer Story could go here if we wanted to cross-link pages, 
                                        but constraint says "No new routing". 
                                    */}

                                    {/* Impact Section */}
                                    {tree.impact && (
                                        <div className="modal-impact-box">
                                            <strong>Your Impact:</strong> {tree.impact}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="tree-modal-footer">
                            <div className="tree-modal-price">{tree.price}</div>
                            <button
                                className="tree-modal-cta"
                                onClick={onGetStarted}
                            >
                                Get Started with this Tree
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') || document.body
    );
};

export default TreeDetailModal;
