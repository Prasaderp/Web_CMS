import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import manuf1 from '../IMAGES/manifacturing intelligence.jpeg';
import manuf2 from '../IMAGES/enterprise.jpeg';
import manuf3 from '../IMAGES/financial.jpeg';
import manuf4 from '../IMAGES/healthcare.jpeg';

const ManufacturingIndustry = () => {
    const industryData = {
        title: "Manufacturing Intelligence",
        tagline: "Optimizing production with predictive AI",
        description: "Modern manufacturing demands efficiency, quality, and agility. Our AI solutions power predictive maintenance, quality control automation, supply chain optimization, and production scheduling—reducing downtime and maximizing throughput. We help manufacturers achieve Industry 4.0 transformation with intelligent systems that learn, adapt, and optimize continuously.",
        services: [
            { 
                title: 'Predictive Maintenance', 
                image: manuf1, 
                description: 'AI-powered equipment health monitoring and maintenance scheduling.' 
            },
            { 
                title: 'Quality Control', 
                image: manuf2, 
                description: 'Computer vision systems for automated quality inspection and defect detection.' 
            },
            { 
                title: 'Process Optimization', 
                image: manuf3, 
                description: 'Machine learning to optimize production parameters and reduce waste.' 
            },
            { 
                title: 'Supply Chain Analytics', 
                image: manuf4, 
                description: 'Intelligent forecasting and logistics optimization for efficiency.' 
            },
        ],
        benefits: [
            'Reduce equipment downtime by 40% with predictive maintenance',
            'Improve product quality and reduce defects through AI inspections',
            'Increase production efficiency and throughput significantly',
            'Optimize supply chains to reduce lead times and costs'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default ManufacturingIndustry;
