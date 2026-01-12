import React from 'react';

function FarmerCard({ farmer, onSelect }) {
    return (
        <div className="farmer-card">
            <div className="farmer-image-wrapper">
                {/* Fallback for placeholder images */}
                <img
                    src={farmer.image}
                    alt={farmer.name}
                    className="farmer-card-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Farmer+Photo' }}
                />
            </div>
            <div className="farmer-card-content">
                <h3 className="farmer-name">{farmer.name}</h3>
                <div className="farmer-region">📍 {farmer.region}</div>

                <div className="farmer-fruits">
                    {farmer.fruits.map((f, i) => (
                        <span key={i} className="fruit-badge">{f}</span>
                    ))}
                </div>

                <button
                    className="farmer-story-btn"
                    onClick={() => onSelect(farmer)}
                >
                    View Story
                </button>
            </div>
        </div>
    );
}

export default FarmerCard;
