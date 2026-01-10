import "../styles/Plans.css";

function Plans() {
  return (
    <section id="plans" className="section">
      <h2>Tree Portfolio</h2>

      <div className="grid">
        
        <div className="plan-card">
          <img src="./Mango Plan card.png" alt="Mango Tree Harvest" className="plan-image"/>
          <div className="plan-content">
          <h3>Mango Tree</h3>
          <p className="price">₹2,999 / season</p>
          <p className="price">Region – Shimla </p>
          <p className="price">Estimated harvest: 20–30 kg </p>
          <p className="price">Harvest window: July–August </p>
          
        {/*<ul><li>Abc</li>
          <li>def</li>
          </ul>*/}
          <button>Rent this Tree</button>
        </div>
        </div>

        <div className="plan-card">
          <img src="./Apple Plan card.png" alt="Apple Tree Harvest" className="plan-image"/>
          <div className="plan-content">
          <h3>Apple Tree</h3>
          <p className="price">₹5,499 / season</p>
        {/*<ul><li>Abc</li>
          <li>def</li>
          </ul>*/}
          <button>Rent this Tree</button>
        </div>
        </div>

        <div className="plan-card">
          <img src="./Guava Plan card.png" alt="Guava Tree Harvest" className="plan-image"/>
          <div className="plan-content">
          <h3>Guava Tree</h3>
          <p className="price">₹3,499 / season</p>
        {/*<ul><li>Abc</li>
          <li>def</li>
          </ul>*/}
          <button>Rent this Tree</button>
        </div>
        </div>

        <div className="plan-card">
          <img src="./Strawberry Plan card.png" alt="Strawberry Tree Harvest" className="plan-image"/>
          <div className="plan-content">
          <h3>Strawberry Tree</h3>
          <p className="price">₹5,499 / season</p>
        {/*<ul><li>Abc</li>
          <li>def</li>
          </ul>*/}
          <button>Rent this Tree</button>
        </div>
        </div>

        {/*<div className="plan-card">
          <h3>🍎 Apple Tree</h3>
          <p>₹5,499 / season</p>
          <button>Subscribe</button>
        </div>

        <div className="plan-card">
          <h3>🍈 Guava Tree</h3>
          <p>₹3,499 / season</p>
          <button>Subscribe</button>
        </div>

        <div className="plan-card">
          <h3>🍓 Strawberry Tree</h3>
          <p>₹5,499 / season</p>
          <button>Subscribe</button>
        </div>*/}

      </div>

      {/* Later:
        - Fetch plans from backend
        - Add Razorpay payment
      */}
    </section>
    
  );
}

export default Plans;
