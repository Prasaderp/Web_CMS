import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import aiEthicsGovernanceImg from '../IMAGES/r&d3.jpg';

const AIEthicsGovernance = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Implementation of Ethical Aspects in AI Products & AI Governance",
        "description": "Responsible AI ensures fairness, transparency, and accountability at every touchpoint",
        "image": aiEthicsGovernanceImg,
        "datePublished": "2025-05-12",
        "author": {
            "@type": "Organization",
            "name": "R&D Department"
        }
    };

    return (
        <>
            <Helmet>
                <title>AI Ethics & Governance - Responsible AI Implementation | R&D</title>
                <meta name="description" content="Comprehensive framework for implementing ethical AI principles and governance structures to ensure fairness, transparency, and accountability in AI systems." />
                <meta name="keywords" content="AI ethics, responsible AI, AI governance, fairness, transparency, accountability" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            {/* ... rest of the component similar to above */}
        </>
    );
};

export default AIEthicsGovernance;