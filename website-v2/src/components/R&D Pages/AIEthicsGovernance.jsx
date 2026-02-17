import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';
import { breadcrumbSchema } from '../../lib/seo.schemas';
import { seoConfig } from '../../lib/seo.config';
import aiEthicsGovernanceImg from '../IMAGES/r&d3.jpg';

const AIEthicsGovernance = () => {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Implementation of Ethical Aspects in AI Products & AI Governance',
        description: 'Responsible AI ensures fairness, transparency, and accountability at every touchpoint',
        image: `${seoConfig.siteUrl}/assets/r&d3.jpg`,
        datePublished: '2025-05-12',
        author: { '@type': 'Organization', name: 'AiGENThix R&D' },
    };

    return (
        <>
            <SEO
                title="AI Ethics & Governance - Responsible AI Implementation | R&D"
                description="Comprehensive framework for implementing ethical AI principles and governance structures to ensure fairness, transparency, and accountability in AI systems."
                keywords="AI ethics, responsible AI, AI governance, fairness, transparency, accountability"
                structuredData={[
                    articleSchema,
                    breadcrumbSchema([{ name: 'R&D', path: '/research-development' }, { name: 'AI Ethics & Governance', path: '/rd/ai-ethics-governance' }]),
                ]}
            />

            {/* ... rest of the component similar to above */}
        </>
    );
};

export default AIEthicsGovernance;