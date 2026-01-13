import { useState, useRef, useEffect } from 'react';
import Section from "../components/UI/Section";
import InfoModal from "../components/UI/InfoModal";
import { howItWorksData } from "../data/howItWorksData";
import "../styles/HowItWorks.css";

function HowItWorks() {
    const { intro, steps, useCases } = howItWorksData;

    // Modal State
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);

    // Carousel State
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            // Tolerance of 1px for float rounding issues
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScroll);
            checkScroll(); // Initial check
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
            // Calculate width of one card + gap (20px)
            const cardWidth = carouselRef.current.children[0].offsetWidth + 20;
            carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const cardWidth = carouselRef.current.children[0].offsetWidth + 20;
            carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    const handleCardClick = (item) => {
        setSelectedContent(item.modalContent || {
            title: item.title,
            description: item.description,
            benefits: ["Learn more by contacting us."]
        });
        setModalOpen(true);
    };

    return (
        <div className="how-it-works-page">
            {/* Intro */}
            <Section title={intro.title} subtitle={intro.subtitle}>
                <div className="hiw-intro">
                    <p>{intro.description}</p>
                </div>
            </Section>

            {/* Vertical Timeline */}
            <Section>
                <div className="hiw-container">
                    <div className="timeline-section">
                        {steps.map((step) => (
                            <div key={step.id} className="timeline-step">
                                {/* Visual Left */}
                                <div className="step-visual">
                                    <div className="step-icon-circle">
                                        {step.icon}
                                    </div>
                                    {/* Line is handled via CSS pseudo-element on .step-visual */}
                                </div>

                                {/* Content Right */}
                                <div className="step-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                    <ul className="step-points">
                                        {step.points.map((point, index) => (
                                            <li key={index}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Use Cases Carousel */}
            <Section title={useCases.title}>
                <div className="hiw-container">
                    <div className="carousel-container">
                        {canScrollLeft && (
                            <button className="carousel-arrow left" onClick={scrollLeft}>←</button>
                        )}

                        <div className="hiw-carousel" ref={carouselRef}>
                            {useCases.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="use-case-card"
                                    onClick={() => handleCardClick(item)}
                                >
                                    <span className="use-case-icon">{item.icon}</span>
                                    <h3 className="use-case-title">{item.title}</h3>
                                    <p className="use-case-desc">{item.description}</p>
                                    <span className="use-case-link">Read More</span>
                                </div>
                            ))}
                        </div>

                        {canScrollRight && (
                            <button className="carousel-arrow right" onClick={scrollRight}>→</button>
                        )}
                    </div>
                </div>
            </Section>

            {/* Modal */}
            <InfoModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                content={selectedContent}
            />
        </div>
    );
}

export default HowItWorks;
