import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import retail1 from '../IMAGES/retail &ecommerce.jpeg';
import retail2 from '../IMAGES/financial.jpeg';
import retail3 from '../IMAGES/healthcare.jpeg';
import retail4 from '../IMAGES/enterprise.jpeg';

const RetailIndustry = () => {
    const industryData = {
        title: "Retail & E-commerce",
        tagline: "Driving sales and customer loyalty through intelligent retail AI",
        description: "Retail is becoming hyper-personalized. Our AI solutions power recommendation engines, dynamic pricing, inventory optimization, and customer behavior insights—helping retailers deliver exceptional experiences and maximize revenue. From predicting customer preferences to optimizing supply chains, we enable modern retailers to compete and thrive in the digital age.",
        services: [
            { 
                title: 'Personalization Engines', 
                image: retail1, 
                description: 'AI-powered product recommendations and customer segmentation for relevance.' 
            },
            { 
                title: 'Demand Forecasting', 
                image: retail2, 
                description: 'Predict market trends and optimize inventory levels across channels.' 
            },
            { 
                title: 'Dynamic Pricing', 
                image: retail3, 
                description: 'Real-time price optimization based on demand, competition, and customer segments.' 
            },
            { 
                title: 'Customer Analytics', 
                image: retail4, 
                description: 'Deep insights into customer behavior, lifetime value, and churn prediction.' 
            },
        ],
        benefits: [
            'Increase average order value by 45% with smart recommendations',
            'Reduce inventory carrying costs with accurate demand forecasting',
            'Improve conversion rates through hyper-personalization',
            'Build customer loyalty with targeted engagement and retention strategies'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default RetailIndustry;
