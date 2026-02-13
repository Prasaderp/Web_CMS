import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import f1 from '../IMAGES/f1.jpg';
import f2 from '../IMAGES/f2.jpg';
import f3 from '../IMAGES/f3.jpg';
import f4 from '../IMAGES/f4.jpg';

const FinanceIndustry = () => {
    const industryData = {
        title: "Finance",
        tagline: "Revolutionizing financial services with cutting-edge AI solutions",
        description: "In the fast-paced world of finance, AI is a game-changer. From algorithmic trading and fraud detection to personalized portfolio management and risk assessment, our AI solutions help financial institutions make smarter decisions, reduce risks, and deliver better customer experiences. We've helped leading financial organizations optimize trading strategies, detect fraudulent transactions in real-time, and personalize wealth management at scale.",
        services: [
            { 
                title: 'AI Finance Companion', 
                image: f1, 
                description: 'Intelligent financial advisory powered by advanced AI algorithms and real-time market analysis.' 
            },
            { 
                title: 'Portfolio Management', 
                image: f2, 
                description: 'Automated investment optimization and wealth management systems tailored to client goals.' 
            },
            { 
                title: 'Algorithmic Trading', 
                image: f3, 
                description: 'Intelligent trading systems that execute strategies at scale with minimal latency.' 
            },
            { 
                title: 'Fraud Detection', 
                image: f4, 
                description: 'Real-time anomaly detection to protect financial assets and prevent fraud.' 
            },
        ],
        benefits: [
            'Reduce fraud losses by up to 70% with AI-powered detection systems',
            'Improve trading performance with algorithmic optimization',
            'Enhance customer satisfaction with personalized financial advice',
            'Ensure regulatory compliance with automated monitoring and reporting'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default FinanceIndustry;
