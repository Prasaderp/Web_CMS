import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// -----------------------------------------------------------------
// 1. IMAGE IMPORTS (Requires all image files in ./IMAGES/ folder)
// -----------------------------------------------------------------
import f1 from '../IMAGES/f1.jpg'; // Finance: AI Finance Companion (Robot)
import f2 from '../IMAGES/f2.jpg'; // Finance: Portfolio Management
import f3 from '../IMAGES/f3.jpg'; // Finance: Algo Trading
import f4 from '../IMAGES/f4.jpg'; // Finance: AI Fraud Detection

import h1 from '../IMAGES/h1.jpg'; // Healthcare: Virtual Health Assistant
import h2 from '../IMAGES/h2.jpg'; // Healthcare: Healthcare Analytics
import h3 from '../IMAGES/h3.jpg'; // Healthcare: Clinical Research Assistant
import h4 from '../IMAGES/h4.jpg'; // Healthcare: Remote Patient Monitoring

import e1 from '../IMAGES/e1.jpg'; // Education: AI Interviewer
import e2 from '../IMAGES/e2.jpg'; // Education: Text Translation
import e3 from '../IMAGES/e3.jpg'; // Education: Video Translation
import e4 from '../IMAGES/e4.jpg'; // Education: Virtual Academic Assistant
import retail1 from '../IMAGES/retail &ecommerce.jpeg';
import manuf1 from '../IMAGES/manifacturing intelligence.jpeg';
import ent1 from '../IMAGES/enterprise.jpeg';


// -----------------------------------------------------------------
// 2. DATA STRUCTURES
// -----------------------------------------------------------------

const industryData = {
    Finance: {
        title: "Finance",
        tagline: "Revolutionizing financial services with cutting-edge AI solutions for asset management, algorithmic trading, and intelligent fraud detection systems.",
        services: [
            { title: 'AI Finance Companion', image: f1, demo: true },
            { title: 'Portfolio Management', image: f2, demo: true },
            { title: 'Algo Trading', image: f3, demo: true },
            { title: 'AI Fraud Detection', image: f4, demo: true },
        ]
    },
    Healthcare: {
        title: "Healthcare",
        tagline: "Transforming patient care, clinical research, and hospital efficiency with intelligent AI solutions for the healthcare industry.",
        services: [
            { title: 'Virtual Health Assistant', image: h1, demo: true },
            { title: 'Healthcare Analytics', image: h2, demo: true },
            { title: 'Clinical Research Assistant', image: h3, demo: true },
            { title: 'Remote Patient Monitoring', image: h4, demo: true },
        ]
    },
    Education: {
        title: "Education",
        tagline: "Driving the future of learning with AI-powered personalized tutoring, administrative efficiency, and language accessibility tools.",
        services: [
            { title: 'AI Interviewer', image: e1, demo: true },
            { title: 'Text Translation', image: e2, demo: true },
            { title: 'Video Translation', image: e3, demo: true },
            { title: 'Virtual Academic Assistant', image: e4, demo: true },
        ]
    }
    ,
    Retail: {
        title: "Retail & E-commerce",
        tagline: "Personalized experiences, recommendation engines and optimized operations for retail and e-commerce businesses.",
        services: [
            { title: 'Personalization Engines', image: retail1, demo: true },
            { title: 'Demand Forecasting', image: retail1, demo: true },
            { title: 'Inventory Optimization', image: retail1, demo: true },
            { title: 'Customer Analytics', image: retail1, demo: true },
        ]
    },
    Manufacturing: {
        title: "Manufacturing Intelligence",
        tagline: "Predictive maintenance, quality automation and process optimization for modern manufacturing.",
        services: [
            { title: 'Predictive Maintenance', image: manuf1, demo: true },
            { title: 'Quality Control Automation', image: manuf1, demo: true },
            { title: 'Process Optimization', image: manuf1, demo: true },
            { title: 'Supply Chain Analytics', image: manuf1, demo: true },
        ]
    },
    Enterprise: {
        title: "Enterprise Solutions",
        tagline: "Custom AI agents, automation platforms and integration for enterprise-scale transformation.",
        services: [
            { title: 'AI Agents & Automation', image: ent1, demo: true },
            { title: 'Enterprise Analytics', image: ent1, demo: true },
            { title: 'Process Orchestration', image: ent1, demo: true },
            { title: 'Security & Compliance', image: ent1, demo: true },
        ]
    }
};


// -----------------------------------------------------------------
// 3. REUSABLE SERVICE CARD COMPONENT (UI/UX Preserved)
// -----------------------------------------------------------------

const ServiceCard = ({ service, index, isVisible }) => (
    <div 
        key={index}
        // Retaining the main animation structure
        className={`flex flex-col items-center text-center p-4 transition-all duration-700 transform hover:-translate-y-2 ${
            isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
    >
        {/* Circular Image Element */}
        <div className="w-48 h-48 mb-6 overflow-hidden rounded-full shadow-2xl border-4 border-white transform transition duration-500 hover:scale-105">
            <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover"
            />
        </div>
        
        {/* Title (Bold, Large Font) */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 transition duration-300">
            {service.title}
        </h3>
        
        {/* Demo Badge - Exact style from screenshot */}
        {service.demo && (
            <div className="mt-2 text-sm text-gray-600 font-medium">
                Demo Available on Request
            </div>
        )}
    </div>
);


// -----------------------------------------------------------------
// 4. MAIN CONSOLIDATED COMPONENT
// -----------------------------------------------------------------

const IndustrySolutions = ({ industryKey = 'Finance' }) => { // Default to Finance
    const [isVisible, setIsVisible] = useState(false);
    
    // Get the data for the selected industry
    const data = industryData[industryKey] || industryData.Finance;

    useEffect(() => {
        // Reset animation state when industry changes (or on initial load)
        setIsVisible(false);
        // Timeout ensures the fade/slide animation runs correctly
        const timer = setTimeout(() => setIsVisible(true), 50); 
        return () => clearTimeout(timer);
    }, [industryKey]);

    return (
        // UI/UX preserved: Light gradient background
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
            
            {/* Hero Section with Animation (UI/UX preserved) */}
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
                <div className="text-center mb-20">
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight">
                        {/* Dynamic Heading based on selected industry */}
                        <span className="text-gray-900">
                            {data.title}
                        </span>
                    </h1>
                    <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
                        {data.tagline}
                    </p>
                </div>

                {/* Services Grid: Circular UI/UX */}
                {/* Note: Grid columns set to 4 to match screenshot style */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-24">
                    {data.services.map((service, index) => (
                        <ServiceCard 
                            key={index} 
                            service={service} 
                            index={index} 
                            isVisible={isVisible} 
                        />
                    ))}
                </div>
            </div>

            {/* Custom Animation Styles (retained for animation fidelity) */}
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

export default IndustrySolutions;