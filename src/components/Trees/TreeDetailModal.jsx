import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { farmersData } from '../../data/farmers';
import NotifyMeModal from './NotifyMeModal';
import ReserveTreeModal from './ReserveTreeModal';
import '../../styles/InfoModal.css'; // Reuse Shell Styles
import '../../styles/TreeDetailModal.css'; // Internal Styles

import { getPriceDetails } from '../../utils/priceUtils';

const TreeDetailModal = ({ isOpen, onClose, tree, onGetStarted }) => {
    const [currentImg, setCurrentImg] = useState(0);
    const [notifyModalOpen, setNotifyModalOpen] = useState(false);
    const [reserveModalOpen, setReserveModalOpen] = useState(false);

    if (!isOpen || !tree) return null;

    const { original, discounted, hasDiscount, discountValue } = getPriceDetails(tree.price, tree.offer);

    const farmer = farmersData.find(f => f.id === tree.farmerId);
    const gallery = tree.gallery && tree.gallery.length > 0 ? tree.gallery : [tree.image];
    // ... rest of logic unchanged ...

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
            <div className="modal-content" style={{ position: 'relative' }}>
                <button className="modal-close" onClick={onClose}>&times;</button>

                {hasDiscount && (
                    <div className="modal-discount-badge" style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        backgroundColor: '#D32F2F',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        zIndex: 5,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        {discountValue}% OFF
                    </div>
                )}

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
                                        <span style={{ color: tree.isAvailable ? '#8BC34A' : '#D32F2F', fontWeight: 'bold' }}>{tree.isAvailable ? "In Stock" : "Out of Stock"}</span>
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
                            <div className="tree-modal-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {hasDiscount ? (
                                    <>
                                        <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '1rem', fontWeight: 'normal' }}>
                                            {original}
                                        </span>
                                        <span style={{ color: '#2E3D2F', fontWeight: 'bold', fontSize: '1.5rem' }}>
                                            {discounted}
                                        </span>
                                    </>
                                ) : (
                                    original
                                )}
                            </div>
                            {tree.isAvailable ? (
                                <button
                                    className="tree-modal-cta"
                                    onClick={() => setReserveModalOpen(true)}
                                >
                                    Reserve This Tree
                                </button>
                            ) : (
                                <button
                                    className="tree-modal-cta"
                                    style={{ backgroundColor: '#FB8C00' }} // Orange/Warning color for Notify Me
                                    onClick={() => setNotifyModalOpen(true)}
                                >
                                    Notify Me When Available
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <NotifyMeModal
                isOpen={notifyModalOpen}
                onClose={() => setNotifyModalOpen(false)}
                tree={tree}
            />
            <ReserveTreeModal
                isOpen={reserveModalOpen}
                onClose={() => setReserveModalOpen(false)}
                tree={tree}
            />
        </div>,
        document.getElementById('modal-root') || document.body
    );
};

export default TreeDetailModal;
