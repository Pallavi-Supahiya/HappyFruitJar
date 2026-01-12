import { useState } from 'react';
import "../styles/ContactPage.css";

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contectNumber: '',
        preferredMethod: 'Email',
        preferredTime: 'Morning (9-12)',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Reset form or handle API call here
    };

    const isPhoneRequired = ['Phone Call', 'WhatsApp'].includes(formData.preferredMethod);

    return (
        <div className="contact-page">
            <div className="contact-hero">
                <h1>Let’s Grow Something Together</h1>
                <p>Have questions about tree adoption? Want to visit a farm? <br /> We’d love to hear from you.</p>
            </div>

            <div className="contact-container">
                {submitted ? (
                    <div className="success-message">
                        <h3>Thanks for reaching out!</h3>
                        <p>We've received your message and will get back to you shortly.</p>
                        <button
                            className="submit-btn"
                            style={{ maxWidth: '200px', marginTop: '20px' }}
                            onClick={() => setSubmitted(false)}
                        >
                            Send Another Message
                        </button>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                required
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Contact Number {isPhoneRequired && '*'}</label>
                            <input
                                type="tel"
                                name="contectNumber"
                                className="form-control"
                                required={isPhoneRequired}
                                value={formData.contectNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Preferred Contact Method</label>
                            <div className="radio-group">
                                {['Phone Call', 'WhatsApp', 'Email'].map(method => (
                                    <label key={method} className="radio-label">
                                        <input
                                            type="radio"
                                            name="preferredMethod"
                                            value={method}
                                            checked={formData.preferredMethod === method}
                                            onChange={handleChange}
                                        />
                                        {method}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Preferred Time (if Phone/WhatsApp)</label>
                            <div className="radio-group">
                                {['Morning (9–12)', 'Afternoon (12–4)', 'Evening (4–7)'].map(time => (
                                    <label key={time} className="radio-label">
                                        <input
                                            type="radio"
                                            name="preferredTime"
                                            value={time}
                                            checked={formData.preferredTime === time}
                                            onChange={handleChange}
                                        />
                                        {time}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Message / Query</label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows="5"
                                placeholder="Tell us what's on your mind..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                )}

                <div className="alternate-contact">
                    <p>Prefer email? Write to us at <a href="mailto:info@happyfruitjar.in">info@happyfruitjar.in</a></p>
                </div>
            </div>
        </div>
    );
}

export default Contact;
