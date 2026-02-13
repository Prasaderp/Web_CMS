import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import ent1 from '../IMAGES/enterprise.jpeg';
import ent2 from '../IMAGES/healthcare.jpeg';
import ent3 from '../IMAGES/financial.jpeg';
import ent4 from '../IMAGES/education.jpeg';

const EnterpriseIndustry = () => {
    const industryData = {
        title: "Enterprise Solutions",
        tagline: "Transforming enterprise operations with intelligent automation",
        description: "Enterprise organizations need to operate at scale with agility and intelligence. Our AI solutions automate business processes, enhance decision-making, ensure security compliance, and drive digital transformation across the organization. From intelligent workflow automation to enterprise-grade analytics, we enable enterprises to innovate faster and operate more efficiently.",
        services: [
            { 
                title: 'AI Agents & Automation', 
                image: ent1, 
                description: 'Intelligent agents for process automation and workflow optimization.' 
            },
            { 
                title: 'Enterprise Analytics', 
                image: ent2, 
                description: 'Advanced analytics for strategic business intelligence and insights.' 
            },
            { 
                title: 'Process Orchestration', 
                image: ent3, 
                description: 'End-to-end workflow automation and system integration.' 
            },
            { 
                title: 'Security & Compliance', 
                image: ent4, 
                description: 'AI-powered threat detection and regulatory compliance monitoring.' 
            },
        ],
        benefits: [
            'Automate 50%+ of routine business processes and reduce costs',
            'Reduce operational costs through intelligent automation and optimization',
            'Improve decision-making with advanced enterprise analytics',
            'Ensure enterprise-wide security and compliance with AI monitoring'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default EnterpriseIndustry;
