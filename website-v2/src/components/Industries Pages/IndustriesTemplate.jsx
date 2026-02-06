import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';

// -----------------------------------------------------------------
// REUSABLE COMPONENT FOR ALL INDUSTRY PAGES
// -----------------------------------------------------------------

const ServiceCard = ({ service, index, isVisible }) => (
    <div 
        className={`flex flex-col items-center text-center p-6 transition-all duration-700 transform hover:-translate-y-3 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
    >
        <div className="w-56 h-56 mb-6 overflow-hidden rounded-full shadow-2xl border-4 border-blue-100 transform transition duration-500 hover:scale-110">
            <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
            />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 transition duration-300 hover:text-blue-600">
            {service.title}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed">
            {service.description}
        </p>
    </div>
);

const BenefitsSection = ({ title, benefits }) => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                Why Choose Us for {title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                    <div 
                        key={index}
                        className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                    >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            ✓
                        </div>
                        <p className="text-gray-700 leading-relaxed font-medium">{benefit}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const IndustryTemplate = ({ industryData }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50); 
        return () => clearTimeout(timer);
    }, [industryData.title]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className={`max-w-7xl mx-auto px-6 pt-32 pb-16 transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        {industryData.title}
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8">
                        {industryData.tagline}
                    </p>
                    <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        {industryData.description}
                    </p>
                </div>

                {/* Services Section */}
                <div className="mb-24">
                    <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
                        Our {industryData.title} Solutions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {industryData.services.map((service, index) => (
                            <ServiceCard 
                                key={index} 
                                service={service} 
                                index={index} 
                                isVisible={isVisible} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <BenefitsSection title={industryData.title} benefits={industryData.benefits} />

            {/* CTA Section */}
            <div className="py-20 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your {industryData.title} Business?</h2>
                    <p className="text-xl mb-10 opacity-90">
                        Let's discuss how our AI solutions can drive innovation and growth in your industry.
                    </p>
                    <Link 
                        to="/contact"
                        className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                    >
                        Schedule Consultation
                    </Link>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default IndustryTemplate;
