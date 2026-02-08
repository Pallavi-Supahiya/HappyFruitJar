import React, { useState } from "react";
import { createPortal } from "react-dom";
// import "../../styles/Modal.css"; // Removed: File does not exist
// Assuming we can reuse SubscriptionModal styles or similar. 
// Let's use inline styles for the content to ensure it matches the request "Do NOT change styles globally"
// and to be safe. But `modal-backdrop` and `modal-content` from TreeDetailModal/InfoModal are likely available globally 
// or I can assume generic ones. 
// Actually SubscriptionModal uses `../../styles/Modal.css` (implied or similar). 
// TreeDetailModal uses `../../styles/InfoModal.css` and `../../styles/TreeDetailModal.css`.
// I will use a simple portal structure similar to TreeDetailModal but smaller.

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAACpFeFvZLZc5IKSsCq184qLFPKawu0uSj_px8Bnj2AvkVKuFwbk25qMZG8prm88P/exec";

const NotifyMeModal = ({ isOpen, onClose, tree }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        setErrorMessage("");

        const payload = {
            email,
            phone,
            treeName: tree?.name || "Unknown",
            fruitType: tree?.type || "Unknown",
            region: tree?.region || "Unknown",
            harvestPeriod: tree?.harvestWindow || "Unknown",
            availabilityStatus: tree?.isAvailable ? "In Stock" : "Out of Stock", // Should be false here usually
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
                    setEmail("");
                    setPhone("");
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

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '400px',
                position: 'relative',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                maxHeight: '80vh',
                overflowY: 'auto',
                margin: 'auto'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666'
                }}>&times;</button>

                {status === "success" ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🌱</div>
                        <h3 style={{ color: '#2E3D2F', marginBottom: '10px' }}>Thank You!</h3>
                        <p style={{ color: '#555' }}>We’ll notify you when the <strong>{tree?.name}</strong> is available.</p>
                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#8BC34A',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                width: '100%'
                            }}
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#2E3D2F' }}>Notify Me</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                            Currently out of stock. Leave your details to get notified.
                        </p>

                        {status === "error" && (
                            <div style={{ color: '#D32F2F', fontSize: '0.9rem', marginBottom: '15px' }}>
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>Email <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>Phone (Optional)</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter phone number"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#2E3D2F', // Dark brand color
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    cursor: status === "submitting" ? 'not-allowed' : 'pointer',
                                    opacity: status === "submitting" ? 0.7 : 1
                                }}
                            >
                                {status === "submitting" ? "Submitting..." : "Notify Me"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default NotifyMeModal;
