import "../../styles/Farmers.css";

function FarmerCard({ image, name, location, bio }) {
    return (
        <div className="farmer-card">
            {image && <img src={image} alt={name} className="farmer-image" />}
            <div className="farmer-info">
                <h3>{name}</h3>
                {location && <p className="location">📍 {location}</p>}
                <p>{bio}</p>
            </div>
        </div>
    );
}

export default FarmerCard;
