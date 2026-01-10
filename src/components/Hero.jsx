import "../styles/Hero.css";



function Hero() {
 
  return (
    <section className="hero">
      <h1>
        Rent a Fruit Tree.<br />
        Eat Fresh. Support Farmers.
      </h1>

      <p>
        Subscribe to a fruit tree and receive seasonal harvests directly
        from the farm.
      </p>

      <button className="primary">
        Rent a Tree
      </button>

      {/* Later: Add video / illustration */}
    </section>
  );
}

export default Hero;
