import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { treesData } from "../data/trees";
import "../styles/InfoModal.css"; // Reuse Verified Shell
import "../styles/SubscriptionModal.css"; // Internal Form Styles

// 🔴 REPLACE WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxno3r9355fSafRMaOeIINbQgmfoayNOvlgbi7mueh2Wxt7MVam_Fs16GzJmvwK5NGV/exec";

function SubscriptionModal({ isOpen, onClose }) {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    location: "",
    fruits: [],
    treeName: ""
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

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
    setStatus("submitting");
    setErrorMessage("");

    const payload = {
      ...formData,
      fruits: formData.fruits.join(", "), // Convert array to string
      timestamp: new Date().toISOString()
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setFormData(initialFormState); // Reset form
        } else {
          setStatus("error");
          setErrorMessage("Something went wrong. Please try again.");
        }
      })
      .catch((err) => {
        setStatus("error");
        setErrorMessage("Network error. Please check your connection.");
      });
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Reset status when closing modal if strictly needed, or let component unmount handle it
  // For now, keeping simple.

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="modal-header">
          <div className="modal-icon-circle">🌱</div>
          <h2>Start Your Journey</h2>
        </div>

        <div className="modal-body">
          {status === "success" ? (
            <div className="success-message" style={{ textAlign: "center", padding: "2rem 0" }}>
              <h3 style={{ color: "#2E7D32", marginBottom: "1rem" }}>Thank You!</h3>
              <p>We've received your details. We'll be in touch shortly to help you start your journey.</p>
              <button
                className="btn"
                onClick={onClose}
                style={{ marginTop: "1.5rem", width: "auto", padding: "0.8rem 2rem" }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="modal-description">
                Join the Happy FruitJar family. Use the form below to let us know what you'd like to grow.
              </p>

              <form className="subscription-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="name" className="form-input" required value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input type="email" name="email" className="form-input" required value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input type="tel" name="phone" className="form-input" required value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label className="form-label">Location (City / Pincode) *</label>
                  <input type="text" name="location" className="form-input" required value={formData.location} onChange={handleChange} />
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
                    value={formData.treeName}
                    onChange={handleChange}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}>
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === "submitting"}
                  style={{ opacity: status === "submitting" ? 0.7 : 1 }}
                >
                  {status === "submitting" ? "Submitting..." : "Get Started"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  );
}

export default SubscriptionModal;
