import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { treesData } from "../data/trees";
import "../styles/InfoModal.css"; // Reuse Verified Shell
import "../styles/SubscriptionModal.css"; // Internal Form Styles

function SubscriptionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    fruits: [],
    treeName: ""
  });

  // Extract unique fruit types from data
  const fruitOptions = useMemo(() => {
    const types = new Set(treesData.map(t => t.type));
    return Array.from(types).sort();
  }, []);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFruitToggle = (fruit) => {
    setFormData(prev => {
      const selected = prev.fruits.includes(fruit)
        ? prev.fruits.filter(f => f !== fruit)
        : [...prev.fruits, fruit];
      return { ...prev, fruits: selected };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Thanks ${formData.name}! We'll contact you shortly to help you start your journey.`);
    onClose();
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="modal-header">
          <div className="modal-icon-circle">🌱</div>
          <h2>Start Your Journey</h2>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Join the Happy FruitJar family. Use the form below to let us know what you'd like to grow.
          </p>

          <form className="subscription-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input type="text" name="name" className="form-input" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" name="email" className="form-input" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input type="tel" name="phone" className="form-input" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Location (City / Pincode) *</label>
              <input type="text" name="location" className="form-input" required onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">Which fruits are you interested in? (Select multiple)</label>
              <div className="fruit-selection-grid">
                {fruitOptions.map(fruit => (
                  <label
                    key={fruit}
                    className={`fruit-checkbox-label ${formData.fruits.includes(fruit) ? 'selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      style={{ display: 'none' }}
                      checked={formData.fruits.includes(fruit)}
                      onChange={() => handleFruitToggle(fruit)}
                    />
                    {formData.fruits.includes(fruit) ? '✔' : '+'} {fruit}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Name Your Tree (Optional)</label>
              <input
                type="text"
                name="treeName"
                className="form-input"
                placeholder="e.g. Grandma's Apple Tree"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">Get Started</button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default SubscriptionModal;
