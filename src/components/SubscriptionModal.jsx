import { useState } from "react";
import "../styles/SubscriptionModal.css";

function SubscriptionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    fruit: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Subscription Interest:", formData);

    // Later: API / Google Sheet / Backend
    alert("Thanks! We'll notify you when subscriptions open 🌱");

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2>Start Your Tree Subscription 🌱</h2>

        <ul className="modal-points">
          <li>Choose a fruit tree</li>
          <li>Get updates from the farm</li>
          <li>Receive fresh harvest in season</li>
        </ul>

        <p className="modal-subtext">
          We’ll notify you when subscriptions open.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            onChange={handleChange}
          />

          <select
            name="fruit"
            required
            onChange={handleChange}
          >
            <option value="">Preferred fruit</option>
            <option value="Apple">Apple 🍎</option>
            <option value="Mango">Mango 🥭</option>
            <option value="Orange">Orange 🍊</option>
            <option value="Guava">Guava</option>
          </select>

          <button type="submit" className="modal-submit">
            Notify Me
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubscriptionModal;
