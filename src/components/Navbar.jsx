import { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
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
      {/* Initial Setup */}
      {/* <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div> */}


{/* Animation step */}
{/* <div
  className={`hamburger ${open ? "active" : ""}`}
  onClick={() => setOpen(!open)}
>
  <span></span>
  <span></span>
  <span></span>
</div> */}

{/* Animation Hamburger from React emojis */}
{/* <div className="hamburger" onClick={() => setOpen(!open)}>
  {open ? <FiX size={28} /> : <FiMenu size={28} />}
</div> */}


{/* Animation from sapling to Apple */}
<div
  className="hamburger"
  onClick={() => setOpen(!open)}
  aria-label="Toggle menu"
>
  {open ? "🍎" : "🌳"}
</div>

      <nav className={open ? "show" : ""}>
        <a href="#how">How It Works</a>
        <a href="#plans">Plans</a>
        <a href="#farmers">Farmers</a>
        <a href="#farmers">About Us</a>

        {/* Later: Login / Dashboard */}
        <button
  className="btn"
  onClick={() => setOpenModal(true)}
>
  Get Started
</button>
      </nav>
    </header>

    <SubscriptionModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
      </>
  );
}

export default Navbar;
