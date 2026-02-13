import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import kpisScalingAIProductsImg from '../IMAGES/r&d4.jpg';

const KPIScalingAIProducts = () => {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4">
            <Helmet>
                <title>KPIs for Scaling AI Products | AiGENThix R&D</title>
                <meta name="description" content="Learn about key performance indicators for scaling AI products and measuring AI solution maturity, ROI, and business integration." />
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link
                    to="/rd"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
                >
                    ← Back to R&D
                </Link>

                {/* Article header */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    KPIs for Scaling AI Products
                </h1>

                {/* Meta information */}
                <div className="flex items-center text-gray-600 mb-8">
                    <span>12 May 2025</span>
                    <span className="mx-2">•</span>
                    <span>Research</span>
                </div>

                {/* Featured image */}
                <img
                    src={kpisScalingAIProductsImg}
                    alt="KPIs for Scaling AI Products"
                    className="w-full rounded-lg shadow-lg mb-8"
                />

                {/* Article content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-gray-700 mb-8">
                        Scaling AI products is not just about accuracy—it's about repeatability,
                        adoption, and impact. Key Performance Indicators (KPIs) are vital to
                        quantify the maturity, ROI, and business integration of your AI solutions.
                    </p>

                    {/* Add your article content here */}
                </div>
            </div>
        </div>
    );
};

export default KPIScalingAIProducts;