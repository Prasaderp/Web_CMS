import React from 'react';

// Correct import paths - images are in ./IMAGES/ folder (same level as components folder)
import featureImage5 from '../IMAGES/a.jpg'; // Enterprise Generative AI Platform
import featureImage6 from '../IMAGES/c.jpg'; // Machinery Troubleshooting Using AI
import featureImage7 from '../IMAGES/b.jpg'; // Gartner Report/Recognition
import featureImage8 from '../IMAGES/d.jpg'; // New AI Platform Launch

// Data for the four distinct features based on the provided images (5, 6, 7, 8)
const featuresData = [
    {
        tag: "#GenerativeAIplatform",
        title: "Enterprise Generative AI Platform",
        content: "ZBrain is an enterprise-grade generative AI platform that enables users to create generative AI applications without the complexities associated with development. Designed to transform business processes, ZBrain enables users to leverage their enterprise data to build intelligent applications tailored to their specific business needs.",
        image: featureImage5,
        link: "#zbrain",
        type: 'Case Study',
    },
    {
        tag: "#AIStrategy&Consulting",
        title: "Machinery Troubleshooting Using AI",
        content: "AiGENThix collaborated with a top-tier Fortune 500 manufacturing company to develop an innovative LLM-powered machinery troubleshooting application. This innovative solution streamlines machinery maintenance, elevates safety protocol adherence and mitigates operational risks of the firm.",
        image: featureImage6,
        link: "#machinery-ai",
        type: 'Case Study',
    },
    {
        tag: "#Recognition",
        title: "AiGENThix Recognized as Representative Vendor in Gartner's 2024 Hype Cycle Report",
        content: "AiGENThix has been recognized as a representative vendor in Gartner's 2024 Hype Cycle Report for Artificial Intelligence. Explore the full report for insights into AI's impact on enterprise transformation.",
        image: featureImage7,
        link: "#gartner-report",
        type: 'News/Media',
    },
    {
        tag: "#ProductLaunch",
        title: "New AI Platform Launch Revolutionizes Enterprise AI",
        content: "AiGENThix launches groundbreaking AI platform that simplifies enterprise AI adoption and deployment. The new platform ensures the delivery of precise responses, whether for customer support, due diligence, or internal knowledge management.",
        image: featureImage8,
        link: "#platform-launch",
        type: 'Product',
    },
];

// Reusable component for an attractive and elegant feature card
const FeatureCard = ({ feature, index }) => {
    // Determine layout: Alternating between image on left and image on right
    const isImageLeft = index % 2 === 0;

    return (
        <div
            className={`flex flex-col lg:flex-row ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
                        bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 mb-12 
                        transform transition-all duration-700 hover:shadow-3xl hover:scale-[1.005]`}
        >
            {/* Image Block */}
            <div className="lg:w-1/2 h-72 md:h-96 lg:h-auto overflow-hidden relative">
                <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-black/80 text-white text-xs font-semibold px-4 py-1 rounded-sm uppercase tracking-wider">
                    {feature.tag}
                </span>
            </div>

            {/* Content Block */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-500 mb-2 uppercase">{feature.type}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight group-hover:text-blue-600 transition duration-300">
                    {feature.title}
                </h3>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {feature.content}
                </p>
                
                {/* CTA Button/Link */}
                <a
                    href={feature.link}
                    className="inline-block self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md text-base transition duration-300 shadow-lg"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
};


const Features = () => {
    return (
        <section className="bg-gray-50 py-24 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Section Heading (Matching the serif style) */}
                <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800 mb-16 text-center tracking-tight">
                    Featured Innovations & Recognition
                </h2>

                {/* Grid of Features (Using alternating two-column layout) */}
                <div className="space-y-16">
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;