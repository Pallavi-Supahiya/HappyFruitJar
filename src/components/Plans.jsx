import "../styles/Plans.css";
import { treesData } from "../data/trees";

function Plans() {
  return (
    <section id="plans" className="section">
      <h2>Tree Portfolio</h2>

      <div className="grid">
        {treesData.slice(0, 4).map((tree) => (
          <div className="plan-card" key={tree.id}>
            <img src={tree.image} alt={`${tree.name} Harvest`} className="plan-image" />
            <div className="plan-content">
              <h3>{tree.name}</h3>
              <p className="price">{tree.price}</p>
              {/* Optional: Add Region/Yield ONLY if it matches the previous design. 
                  The previous design had:
                  Region – Shimla
                  Estimated harvest: 20–30 kg
                  Harvest window: July–August
                  
                  I will conditionally map these if they exist in the data to maintain parity.
              */}
              {tree.region && <p className="price">Region – {tree.region}</p>}
              {tree.yield && <p className="price">Estimated harvest: {tree.yield}</p>}
              {tree.harvestWindow && <p className="price">Harvest window: {tree.harvestWindow}</p>}

              <button>Rent this Tree</button>
            </div>
          </div>
        ))}
      </div>

      {/* Later:
        - Fetch plans from backend
        - Add Razorpay payment
      */}
    </section>

  );
}

export default Plans;
