import "../styles/HowItWorks.css";

function HowItWorks() {
  return (
    <section id="how" className="section">
      <h2>How It Works</h2>

      <div className="grid">

    {/* Step 1 */}
        <div className="flip-step">
          <div className="flip-inner">

            <div className="flip-front">
              <span className="icon">🌳</span>
              <h3>Choose a Tree</h3>
            </div>

            <div className="flip-back">
              <p>
                Browse available fruit trees/crops and select the one you’d like to adopt for the season.<br></br>
Each tree comes with an estimated harvest, timeline, and experience details.

              </p>
            </div>

          </div>
        </div>

        {/* Step 2 */}
        <div className="flip-step">
          <div className="flip-inner">

            <div className="flip-front">
              <span className="icon">✅</span>
              <h3>Details & confirm adoption</h3>
            </div>

            <div className="flip-back">
              <p>
                Once selected, confirm adoption by sharing your details. We’ll share your tree details and next steps via E-mail and WhatsApp.
              </p>
            </div>

          </div>
        </div>

        {/* Step 3 */}
        <div className="flip-step">
          <div className="flip-inner">

            <div className="flip-front">
              <span className="icon">🗓️</span>
              <h3>Your Tree is Reserved</h3>
            </div>

            <div className="flip-back">
              <p>
                Your tree is reserved, Updates and growth tracking will begin shortly.
              </p>
            </div>

          </div>
        </div>

{/* Step 4 */}
        <div className="flip-step">
          <div className="flip-inner">

            <div className="flip-front">
              <span className="icon">👨🏻‍🌾</span>
              <h3>Harvest Time</h3>
            </div>

            <div className="flip-back">
              <p>
                Your fruits are ready. Choose delivery or visit the orchard to harvest them yourself.
              </p>
            </div>

          </div>
        </div>

       {/* <div className="card">🌳 Choose a Tree</div>
        <div className="card">📅 Subscribe for Season</div>
        <div className="card">👨‍🌾 Farmer Grows It</div>
        <div className="card">📦 Fresh Delivery</div> */}
      </div>

      {/* Later: Add animations or icons */}
    </section>
  );
}

export default HowItWorks;
