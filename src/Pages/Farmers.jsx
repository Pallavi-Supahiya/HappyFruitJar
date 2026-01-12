import { useState, useMemo } from 'react';
import { farmersData } from "../data/farmers";
import FarmerCard from "../components/Farmers/FarmerCard";
import FarmerDetailModal from "../components/Farmers/FarmerDetailModal";
import "../styles/FarmersPage.css";

function Farmers() {
    const [filter, setFilter] = useState('All');
    const [selectedFarmer, setSelectedFarmer] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Dynamic Regions
    const regions = ['All', ...new Set(farmersData.map(f => f.region.split(',')[0].trim()))];

    const filteredFarmers = useMemo(() => {
        if (filter === 'All') return farmersData;
        return farmersData.filter(f => f.region.includes(filter));
    }, [filter]);

    const handleSelect = (farmer) => {
        setSelectedFarmer(farmer);
        setModalOpen(true);
    };

    return (
        <div className="farmers-page">
            <div className="farmers-hero">
                <h1>Our Partner Farmers</h1>
                <p>We work directly with small-holder farmers who are custodians of the land.</p>
            </div>

            <div className="region-filter-bar">
                {regions.map(r => (
                    <button
                        key={r}
                        className={`region-pill ${filter === r ? 'active' : ''}`}
                        onClick={() => setFilter(r)}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <div className="farmers-grid">
                {filteredFarmers.map(farmer => (
                    <FarmerCard
                        key={farmer.id}
                        farmer={farmer}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            <FarmerDetailModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                farmer={selectedFarmer}
            />
        </div>
    );
}

export default Farmers;
