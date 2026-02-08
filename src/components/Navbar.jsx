import { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import SubscriptionModal from "./SubscriptionModal";


function Navbar() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo-link">
          <img src="/Happy_FruitJar_Logo_new.png" alt="Happy FruitJar" className="logo" />
        </Link>

        {/* Mobile Menu Trigger (Tree Icon) */}
        <div
          className="mobile-trigger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "❌" : "🌳"}
        </div>

        {/* Navigation Links (Desktop + Mobile Slide-in) */}
        <nav className={`nav-menu ${open ? "active" : ""}`}>
          {/* Close button inside menu for mobile convenience */}
          {/* <div className="menu-close" onClick={() => setOpen(false)}>✕</div> */}

          <Link to="/how-it-works" onClick={() => setOpen(false)}>How It Works</Link>
          <Link to="/trees" onClick={() => setOpen(false)}>Trees</Link>
          <Link to="/farmers" onClick={() => setOpen(false)}>Farmers</Link>

          <button
            className="btn"
            onClick={() => {
              setOpen(false);
              setOpenModal(true);
            }}
          >
            Get Started
          </button>
        </nav>

        {/* Backdrop for mobile */}
        {open && <div className="backdrop" onClick={() => setOpen(false)}></div>}
      </header>

      <SubscriptionModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default Navbar;
