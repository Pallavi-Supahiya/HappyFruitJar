import React, { useState } from "react";
import { createPortal } from "react-dom";
import { getPriceDetails } from '../../utils/priceUtils';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyCuqLN84aP7huWL8HJGkXW7av0dxA9u3XG05oYH8l_II0fUB3GiKVxOMp8IT_B3vx9/exec";

const ReserveTreeModal = ({ isOpen, onClose, tree }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("idle"); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!fullName || !email || !phone) return;

        setStatus("submitting");
        setErrorMessage("");

        const { discounted, original } = getPriceDetails(tree?.price, tree?.offer);
        const finalPrice = discounted || original;

        const payload = {
            fullName,
            email,
            phone,
            location,
            treeName: tree?.name || "Unknown",
            fruitType: tree?.type || "Unknown",
            region: tree?.region || "Unknown",
            harvestWindow: tree?.harvestWindow || "Unknown",
            price: finalPrice || "Unknown",
            availability: "In Stock",
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
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setLocation("");
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
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎉</div>
                        <h3 style={{ color: '#2E3D2F', marginBottom: '10px' }}>Request Received!</h3>
                        <p style={{ color: '#555' }}>We have received your reservation request for <strong>{tree?.name}</strong>.</p>
                        <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '5px' }}>
                            You will receive a confirmation email within 24 hours, and our team will reach out to you shortly.
                        </p>
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
                        <h3 style={{ marginTop: 0, marginBottom: '10px', color: '#2E3D2F' }}>Reserve This Tree</h3>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
                            Complete the form to reserve <strong>{tree?.name}</strong>.
                        </p>

                        {status === "error" && (
                            <div style={{ color: '#D32F2F', fontSize: '0.9rem', marginBottom: '15px' }}>
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>Full Name <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>Email <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ddd',
                                        fontSize: '1rem'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Your phone number"
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
                                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '5px', color: '#333' }}>City / Pincode</label>
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="City or Pincode"
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
                                {status === "submitting" ? "Reserving..." : "Confirm Reservation"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
    );
};

export default ReserveTreeModal;
