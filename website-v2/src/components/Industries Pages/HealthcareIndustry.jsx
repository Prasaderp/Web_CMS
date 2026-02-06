import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import h1 from '../IMAGES/h1.jpg';
import h2 from '../IMAGES/h2.jpg';
import h3 from '../IMAGES/h3.jpg';
import h4 from '../IMAGES/h4.jpg';

const HealthcareIndustry = () => {
    const industryData = {
        title: "Healthcare",
        tagline: "Transforming patient care through intelligent healthcare AI",
        description: "Healthcare providers face unprecedented challenges—rising costs, growing patient populations, and complex treatment decisions. Our AI solutions enhance diagnostics, accelerate drug discovery, optimize patient care pathways, and improve operational efficiency. From AI-powered clinical decision support to predictive patient analytics, we help healthcare organizations deliver better outcomes while reducing costs.",
        services: [
            { 
                title: 'Virtual Health Assistant', 
                image: h1, 
                description: 'AI-powered patient engagement and support systems available 24/7.' 
            },
            { 
                title: 'Healthcare Analytics', 
                image: h2, 
                description: 'Predictive analytics for patient outcomes and hospital operations management.' 
            },
            { 
                title: 'Clinical Research Assistant', 
                image: h3, 
                description: 'Accelerate research with AI-powered data analysis and literature review.' 
            },
            { 
                title: 'Remote Patient Monitoring', 
                image: h4, 
                description: 'Continuous health monitoring with intelligent alerting for early interventions.' 
            },
        ],
        benefits: [
            'Reduce diagnostic errors through AI-assisted clinical decision support',
            'Improve patient outcomes with predictive analytics and early detection',
            'Accelerate drug discovery and clinical trials by 40%',
            'Optimize hospital operations and reduce patient wait times significantly'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default HealthcareIndustry;
