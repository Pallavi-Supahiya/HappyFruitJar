import { Link } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion";
import { faqData } from "../data/faqData";
import "../styles/FAQ.css";

function FAQ() {
  return (
    <div className="faq-page">

      {/* HERO */}
      <section className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Answers to your most common questions.</p>
        <p style={{ marginTop: '10px', fontSize: '1rem', opacity: 0.9 }}>
          Everything you need to know about renting a tree,
          supporting farmers, and receiving fresh harvests.
        </p>
      </section>

      {/* FAQ SECTIONS */}
      {faqData.map((section) => (
        <section
          key={section.id}
          className={`faq-section ${section.className || ''}`}
        >
          <h2>{section.title}</h2>
          {section.questions.map((item) => (
            <FAQAccordion
              key={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </section>
      ))}

      {/* CTA */}
      <section className="faq-cta">
        <h3>Still have questions?</h3>
        <p>We’re happy to help you understand how Happy FruitJar works.</p>
        <Link to="/contact">
          <button style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'white',
            background: '#2E3D2F',
            border: 'none',
            borderRadius: '30px',
            cursor: 'pointer'
          }}>
            Contact Us
          </button>
        </Link>
      </section>

    </div>
  );
}

export default FAQ;
