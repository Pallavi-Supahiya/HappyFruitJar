import FAQAccordion from "../components/FAQAccordion";
import "../styles/FAQ.css";

function FAQ() {
  return (
    <div className="faq-page">

      {/* HERO */}
      <section className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>
          Everything you need to know about renting a tree,
          supporting farmers, and receiving fresh harvests.
        </p>
      </section>

      {/* FAQ SECTIONS */}
      <section className="faq-section">
        <h2>About Happy FruitJar</h2>

        <FAQAccordion
          question="What is Happy FruitJar?"
          answer="Happy FruitJar is an agritech platform that lets you rent a fruit tree directly from farmers and receive seasonal harvests—without middlemen."
        />

        <FAQAccordion
          question="Why rent a tree instead of buying fruit?"
          answer="By renting a tree, you get traceability, fair farmer income, and fresher produce while supporting sustainable farming."
        />

        <FAQAccordion
          question="Is there customer support if I have questions?"
          answer="Yes! Our friendly support team is here to help you at every step whether it’s about your tree, delivery, or anything else to make sure your experience is smooth and worry-free."
        />

      </section>

      <section className="faq-section light-bg">
        <h2>Tree Subscription</h2>

        <FAQAccordion
          question="Do I own the land or the tree?"
          answer="No. You are adopting the harvest and experience for one season. The land and trees remain with the farmer."
        />

        <FAQAccordion
          question="How will I receive updates?"
          answer="We send periodic photo and growth updates via email or WhatsApp during the growing season."
        />

        <FAQAccordion
          question="Can I gift a tree to someone?"
          answer="Absolutely! Gifting a tree is a meaningful and lasting way to show you care. You can even receive updates about your tree’s growth, making it a gift that keeps giving."
        />

        <FAQAccordion
          question="Do you offer seasonal produce only?"
          answer="Most of our products are seasonal, grown naturally according to the local climate and soil."
        />

        <FAQAccordion
          question="Do you offer different types of fruit trees?"
          answer="Right now, we focus on Himachal’s native fruit trees, like apples and stone fruits, carefully suited to the region. As we grow, we plan to expand to more crops and regions—so you’ll have even more choices to gift or grow in the future."
        />

        <FAQAccordion
          question="How long is a tree subscription?"
          answer="Each subscription lasts for one harvest season, depending on the fruit."
        />

        <FAQAccordion
          question="Can I choose the farmer?"
          answer="Yes, wherever available, you can see the region and farmer details before subscribing."
        />

        <FAQAccordion
          question="Are there any hidden costs?"
          answer="No hidden fees. The price you see includes everything, including delivery, tree care, and farmer support."
        />

      </section>

      <section className="faq-section">
        <h2>Harvest & Delivery</h2>

        <FAQAccordion
          question="What if the harvest is less than estimated?"
          answer="Farming depends on natural weather conditions. We share realistic estimates and regular updates are provided throughout the season. Estimates may vary from season to season."
        />

        <FAQAccordion
          question="Can I visit the farm?"
          answer="Yes. Many options include an opportunity to visit the orchard during blooming or harvest time, subject to prior coordination and arrangements."
        />

        <FAQAccordion
          question="Is home delivery available?"
          answer="Yes. You can choose to have your harvest delivered or collect it during a farm visit."
        />

        <FAQAccordion
          question="How will I receive my fruits?"
          answer="Harvests are delivered in batches during the season, directly from the farm to your home."
        />

        <FAQAccordion
          question="How do you ensure my produce reaches me fresh?"
          answer="We carefully handle every order to keep it fresh. Currently, our team coordinates with the logistics partners and ensures timely delivery in top quality."
        />

        <FAQAccordion
          question="What happens if weather affects the crop?"
          answer="Weather may impact timelines or quantity. Transparency is key and we inform you early and clearly if conditions change. Though the crops are insured, but in case of such situation we try to give the next best resolution to customers."
        />
      </section>

      {/* CTA */}
      <section className="faq-cta">
        <h3>Still have questions?</h3>
        <p>We’re happy to help you understand how Happy FruitJar works.</p>
        <button>Contact Us</button>
      </section>

    </div>
  );
}

export default FAQ;
