import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { seasonalOffer } from '../../data/seasonalOffer.js'; // Adjust path based on location
import '../../styles/SeasonalPopup.css'; // Adjust path based on location

const SeasonalPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Check if offer is enabled globally
        if (!seasonalOffer.isEnabled) return;

        // 2. Check if user has already seen this specific campaign in this session
        const seenKey = `seen_popup_${seasonalOffer.id}`;
        const hasSeen = sessionStorage.getItem(seenKey);

        if (!hasSeen) {
            // Delay slightly for better UX (don't pop immediately on load)
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // 1 second delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Mark as seen for this session
        sessionStorage.setItem(`seen_popup_${seasonalOffer.id}`, 'true');
    };

    const handleCtaClick = (e) => {
        e.preventDefault();
        handleClose();
        navigate(seasonalOffer.ctaLink);
    };

    if (!isVisible) return null;

    return createPortal(
        <div className="seasonal-popup-overlay">
            <div
                className="seasonal-popup-content"
                style={{ backgroundImage: seasonalOffer.image ? `url("${seasonalOffer.image}")` : 'none' }}
            >
                <button className="seasonal-popup-close" onClick={handleClose}>&times;</button>
                <div className="seasonal-content-wrapper">

                    <h2 className="seasonal-popup-title">{seasonalOffer.title}</h2>
                    <p className="seasonal-popup-subtitle">{seasonalOffer.subtitle}</p>

                    <a href={seasonalOffer.ctaLink} onClick={handleCtaClick} className="seasonal-popup-cta">
                        {seasonalOffer.ctaText}
                    </a>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SeasonalPopup;
