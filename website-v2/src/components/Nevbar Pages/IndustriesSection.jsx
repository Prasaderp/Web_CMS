import React from 'react';

// Import images
import bankingImg from '../IMAGES/1.jpg';
import manufacturingImg from '../IMAGES/2.jpg';
import retailImg from '../IMAGES/3.jpg';
import logisticsImg from '../IMAGES/4.jpg';
import healthcareImg from '../IMAGES/5.jpg';
import technologyImg from '../IMAGES/6.jpg';
import consumerElectronicsImg from '../IMAGES/7.jpg';
import startupsImg from '../IMAGES/8.jpg';

// Data for the industries with images and descriptions
const industriesData = [
    { 
        name: "Banking & Finance", 
        image: bankingImg,
        description: "AI solutions for fraud detection, risk assessment, and automated trading"
    },
    { 
        name: "Manufacturing", 
        image: manufacturingImg,
        description: "Predictive maintenance, quality control, and supply chain optimization"
    },
    { 
        name: "Retail & E-commerce", 
        image: retailImg,
        description: "Personalized recommendations, inventory management, and customer analytics"
    },
    { 
        name: "Logistics", 
        image: logisticsImg,
        description: "Route optimization, demand forecasting, and warehouse automation"
    },
    { 
        name: "Healthcare", 
        image: healthcareImg,
        description: "Medical diagnosis, drug discovery, and patient care optimization"
    },
    { 
        name: "Technology", 
        image: technologyImg,
        description: "Software development automation, cybersecurity, and cloud optimization"
    },
    { 
        name: "Consumer Electronics", 
        image: consumerElectronicsImg,
        description: "Smart devices, IoT integration, and user experience enhancement"
    },
    { 
        name: "Startups", 
        image: startupsImg,
        description: "MVP development, scaling solutions, and innovation acceleration"
    },
];

const IndustriesSection = () => {
    return (
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6 text-center tracking-tight">
                    Redefining Industries with Creative Software Solutions
                </h2>
                
                {/* Subheading */}
                <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
                    Empowering diverse sectors with cutting-edge AI and software innovation tailored to transform business outcomes
                </p>

                {/* Industries Grid - 4 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {industriesData.map((industry, index) => (
                        <div 
                            key={index} 
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={industry.image} 
                                    alt={industry.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition duration-300"></div>
                                
                                {/* Icon Badge (Optional decorative element) */}
                                <div className="absolute top-4 right-4 w-10 h-10 bg-blue-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition duration-300">
                                    {industry.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {industry.description}
                                </p>
                                
                                {/* Learn More Link */}
                                <a 
                                    href="#" 
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition duration-200 group-hover:translate-x-1"
                                >
                                    Learn More
                                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-6 text-lg">
                        Ready to transform your industry with AI?
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-base transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Explore Our Solutions
                    </button>
                </div>
            </div>
        </section>
    );
};

export default IndustriesSection;