import "../../styles/FlipCard.css";

function FlipCard({ icon, title, description }) {
    return (
        <div className="flip-step">
            <div className="flip-inner">
                <div className="flip-front">
                    <span className="icon">{icon}</span>
                    <h3>{title}</h3>
                </div>
                <div className="flip-back">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;
