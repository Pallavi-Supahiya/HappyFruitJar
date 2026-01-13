import "../../styles/Plans.css";

function TreeCard({ image, name, price, region, harvest, window, onRent }) {
    return (
        <div className="plan-card">
            <img src={image} alt={name} className="plan-image" />
            <div className="plan-content">
                <h3>{name}</h3>
                <p className="price">{price}</p>
                {region && <p className="price">Region – {region}</p>}
                {window && <p className="price">Harvest window: {window}</p>}
                <button onClick={onRent}>Explore Tree</button>
            </div>
        </div>
    );
}

export default TreeCard;
