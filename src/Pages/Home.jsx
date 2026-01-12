import { useState, useRef, useEffect } from 'react';
import { homeContent } from "../data/homeContent";
import { treesData } from "../data/trees";
import { Link } from "react-router-dom";
import Section from "../components/UI/Section";
import FlipCard from "../components/UI/FlipCard";
import TreeCard from "../components/UI/TreeCard";
import Hero from "../components/Hero";
import TreeDetailModal from "../components/Trees/TreeDetailModal";
import SubscriptionModal from "../components/SubscriptionModal";

import "../styles/Farmers.css";

function Home() {
  const { howItWorks, featuredTrees, farmers } = homeContent;
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [selectedTree, setSelectedTree] = useState(null);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleTreeSelect = (tree) => {
    setSelectedTree(tree);
    setModalOpen(true);
  };

  return (
    <>
      <Hero />

      <Section id="how" title={howItWorks.title}>
        <div className="flip-card-grid">
          {howItWorks.steps.map((step) => (
            <FlipCard
              key={step.id}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '20px' }}>
          <Link
            to={howItWorks.ctaLink}
            style={{
              color: '#8BC34A',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {howItWorks.ctaText} &gt;&gt;
          </Link>
        </div>
      </Section>

      <Section id="plans" title={featuredTrees.title}>
        <div style={{ position: 'relative' }}>
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              className="nav-arrow left"
              onClick={scrollLeft}
              style={{
                position: 'absolute', left: '-10px', top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, background: '#8BC34A', color: 'white', border: 'none', borderRadius: '50%',
                width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
              }}
            >
              ←
            </button>
          )}

          <div className="plans-carousel" ref={carouselRef}>
            {treesData.map((tree) => (
              <TreeCard
                key={tree.id}
                image={tree.image}
                name={tree.name}
                price={tree.price}
                region={tree.region}
                harvest={tree.yield}
                window={tree.harvestWindow}
                onRent={() => handleTreeSelect(tree)}
              />
            ))}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              className="nav-arrow right"
              onClick={scrollRight}
              style={{
                position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, background: '#8BC34A', color: 'white', border: 'none', borderRadius: '50%',
                width: '40px', height: '40px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
              }}
            >
              →
            </button>
          )}
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '20px' }}>
          <Link
            to={featuredTrees.ctaLink}
            style={{
              color: '#8BC34A',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {featuredTrees.ctaText} &gt;&gt;
          </Link>
        </div>
      </Section>

      <Section id="farmers" title={farmers.title}>
        <div className="farmers-preview">
          <p className="farmers-description">{farmers.description}</p>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '20px' }}>
          <Link
            to={farmers.ctaLink}
            style={{
              color: '#8BC34A',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            {farmers.ctaText} &gt;&gt;
          </Link>
        </div>
      </Section>

      {/* Modals */}
      <TreeDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tree={selectedTree}
        onGetStarted={() => {
          setModalOpen(false);
          setTimeout(() => setSubscriptionModalOpen(true), 200);
        }}
      />

      <SubscriptionModal
        isOpen={subscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
      />
    </>
  );
}

export default Home;
