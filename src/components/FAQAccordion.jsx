import { useState } from "react";

function FAQAccordion({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-accordion ${open ? "open" : ""}`}>
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default FAQAccordion;
