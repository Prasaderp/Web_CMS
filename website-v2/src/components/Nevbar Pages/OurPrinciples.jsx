import React from 'react';

// --- Image Imports ---
// Mapping uploaded file names to the component's imports
import trustImage from '../IMAGES/trust&safety.webp';
import ethicsImage from '../IMAGES/ai ethics.webp';
import humanImage from '../IMAGES/humancentric.webp';
import transparencyImage from '../IMAGES/transparency.webp';
import pioneeringImage from '../IMAGES/pinoeering.webp';
import innovationImage from '../IMAGES/innovationn.webp';
import literacyImage from '../IMAGES/ailiteracy.webp';
import advocacyImage from '../IMAGES/advocacy.webp'; 

// --- Constants & Styling ---
const MAIN_FONT = "'Playfair Display', Georgia, serif";
const ACCENT_COLOR = '#2D4DE8'; // Blue color for borders/accents

// --- Principle Data (Matched to the UI and images) ---
const principlesData = [
    // --- First Row (based on image_7f0d7c.jpg) ---
    { 
        title: "Innovation", 
        description: "Bridging AI and human intelligence to create sustainable and impactful solutions. Websites that are optimized for performance.", 
        image: innovationImage 
    },
    { 
        title: "Trust & Safety", 
        description: "Continuously enhancing AI fairness, security, and ethical implementation.", 
        image: trustImage 
    },
    { 
        title: "Transparency", 
        description: "Building AI solutions that are secure and aligned with ethical principles.", 
        image: transparencyImage 
    },
    { 
        title: "AI Literacy", 
        description: "Empowering industries with knowledge to foster responsible AI adoption.", 
        image: literacyImage 
    },

    // --- Second Row (based on image_7f0d5d.jpg) ---
    { 
        title: "Advocacy", 
        description: "Raising awareness and shaping AI policies that serve humanity.", 
        image: advocacyImage 
    },
    { 
        title: "Pioneering Excellence", 
        description: "Leading the AI revolution with ground-breaking solutions that set us apart from the competition.", 
        image: pioneeringImage 
    },
    { 
        title: "AI Ethics", 
        description: "Ensuring AI solutions align with ethical guidelines to prevent bias and discrimination.", 
        image: ethicsImage 
    },
    { 
        title: "Human-Centered AI", 
        description: "Designing AI solutions that enhance human capabilities rather than replace them.", 
        image: humanImage 
    },
];

// --- Keyframe CSS for Elegant Animation ---
const fadeInSlide = `
  @keyframes fadeInSlide {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Dynamically insert keyframes
try {
    const styleSheet = document.styleSheets[0];
    const rules = Array.from(styleSheet.cssRules).map(rule => rule.cssText);
    if (!rules.some(rule => rule.includes('@keyframes fadeInSlide'))) {
        styleSheet.insertRule(fadeInSlide, styleSheet.cssRules.length);
    }
} catch (e) {
    console.warn("Animation keyframes insertion failed.", e);
}


// Reusable Principle Card Component
const PrincipleCard = ({ principle, index }) => {
    // Staggered fade-in animation delay
    const animationDelay = `${0.5 + index * 0.1}s`; 
    
    // Determine the border color based on the row (subtle color shift for visual appeal)
    const cardAccentColor = index < 4 ? ACCENT_COLOR : '#008080'; // Blue for first row, Teal for second

    const cardStyle = {
        position: 'relative',
        backgroundColor: '#ffffff', // White background for clean look
        borderRadius: '12px',
        overflow: 'hidden',
        padding: '30px 20px',
        textAlign: 'center',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)', // Custom smooth transition
        cursor: 'pointer',
        borderBottom: `4px solid ${cardAccentColor}30`, // Subtle border at 30% opacity
        opacity: 0,
        animation: `fadeInSlide 0.8s ease-out ${animationDelay} forwards`,
    };

    const titleStyle = {
        fontSize: '22px', // Slightly larger title
        fontWeight: '700',
        fontFamily: MAIN_FONT,
        color: '#1a1a1a',
        marginBottom: '10px',
    };

    const descriptionStyle = {
        fontSize: '15px',
        color: '#555',
        lineHeight: '1.6',
        fontFamily: 'Georgia, serif',
    };

    return (
        <div 
            style={cardStyle}
            // Attractive and Elegant Hover Effect
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)'; // More pronounced lift
                e.currentTarget.style.boxShadow = '0 18px 35px rgba(0, 0, 0, 0.2)'; // Deeper shadow
                e.currentTarget.style.borderBottom = `4px solid ${cardAccentColor}`; // Solid accent color on hover
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderBottom = `4px solid ${cardAccentColor}30`;
            }}
        >
            {/* Circular Image Area */}
            <div className="w-24 h-24 mx-auto mb-5 overflow-hidden rounded-full border-4 border-transparent transition duration-300 group-hover:border-blue-100">
                <img 
                    src={principle.image} 
                    alt={principle.title} 
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                    style={{ borderRadius: '50%' }}
                />
            </div>
            
            <h3 style={titleStyle}>
                {principle.title.includes(' ') ? 
                 principle.title.split(' ').map((word, i) => (
                    <span key={i} className={i === 0 ? 'block' : 'block'}>{word}</span>
                 )) : principle.title}
                {/* Titles are split onto multiple lines to match image UI */}
            </h3>
            
            <p style={descriptionStyle}>
                {principle.description}
            </p>
        </div>
    );
};


const OurPrinciples = () => {
    return (
        <section className="bg-gray-50 py-24 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section (Matching Image Text and Style) */}
                <h1 
                    className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-4 text-center" 
                    style={{ fontFamily: MAIN_FONT, opacity: 0, animation: 'fadeInSlide 0.8s ease-out 0s forwards' }}
                >
                    Our Core Principles
                </h1>
                <p 
                    className="text-xl text-gray-600 mb-16 text-center max-w-4xl mx-auto"
                    style={{ opacity: 0, animation: 'fadeInSlide 0.8s ease-out 0.2s forwards' }}
                >
                    Guiding every innovation with a foundation built on ethics, responsibility, and human progress.
                </p>

                {/* Principles Grid (4 columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {principlesData.map((principle, index) => (
                        <PrincipleCard key={index} principle={principle} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurPrinciples;