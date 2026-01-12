import "../../styles/Global.css"; // Ensure global styles are available, though usually in main.jsx
// For now, Section might rely on global 'section' class defined elsewhere.

function Section({ id, title, subtitle, className, children }) {
    return (
        <section id={id} className={`section ${className || ""}`}>
            {title && <h2>{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            {children}
        </section>
    );
}

export default Section;
