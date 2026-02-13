import React from 'react';

// Import images
import sahayakAiImg from '../IMAGES/sahayak ai.jpeg';
import videoTranslationImg from '../IMAGES/video translation.jpeg';
import aiInterviewerImg from '../IMAGES/ai interviewer.jpeg';
import projectManagementImg from '../IMAGES/project.jpeg';
import aiReceptionistImg from '../IMAGES/ai.jpeg';

// Product data, including concise descriptions and image paths
const productsData = [
    {
        name: "Shayak AI",
        description: "An intelligent virtual assistant designed for comprehensive data retrieval and workflow automation across enterprise systems.",
        imagePath: sahayakAiImg,
        tag: "#Productivity"
    },
    {
        name: "Video Translation",
        description: "Real-time, AI-driven video content translation and localization services, enabling global accessibility with natural voice synthesis.",
        imagePath: videoTranslationImg,
        tag: "#GlobalReach"
    },
    {
        name: "AI Interviewer",
        description: "Automated pre-screening and candidate evaluation tool that conducts interviews using natural language processing to assess skills and fit.",
        imagePath: aiInterviewerImg,
        tag: "#Recruitment"
    },
    {
        name: "Project Management Tool",
        description: "AI-powered scheduling, resource allocation, and risk prediction for project managers, ensuring projects stay on time and budget.",
        imagePath: projectManagementImg,
        tag: "#Operations"
    },
    {
        name: "AI Receptionist",
        description: "A virtual front-desk solution offering 24/7 client interaction, booking, and redirection services with human-like conversational ability.",
        imagePath: aiReceptionistImg,
        tag: "#ClientService"
    },
];

const ProductsSection = () => {
    return (
        <section className="bg-[#0B2847] py-20 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Heading: Using the requested "AiGENThix AI Products" text */}
                <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white mb-16 text-center tracking-wide">
                    AiGENThix AI Products
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {productsData.map((product, index) => (
                        <div 
                            key={index} 
                            className="bg-[#0F396D] rounded-xl shadow-2xl overflow-hidden 
                                       border border-[#1a4f8d] transition duration-500 
                                       transform hover:scale-[1.03] flex flex-col group"
                        >
                            {/* Image Area */}
                            <div className="h-48 bg-gray-900/50 flex items-center justify-center relative overflow-hidden">
                                <img 
                                    src={product.imagePath} 
                                    alt={product.name} 
                                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                
                                {/* Fallback icon if image fails to load */}
                                <div className="absolute inset-0 hidden items-center justify-center text-center bg-gray-900/50">
                                     <svg className="w-12 h-12 text-[#6DD5ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                            </div>
                            
                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-xs font-semibold text-[#6DD5ED] mb-2 uppercase">{product.tag}</span>
                                
                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    {product.name}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-gray-300 text-base leading-relaxed flex-grow mb-4">
                                    {product.description}
                                </p>

                                {/* Call to action link */}
                                <a 
                                    href="#" 
                                    className="mt-auto text-[#6DD5ED] hover:text-[#4285F4] font-semibold text-sm transition duration-200 flex items-center"
                                >
                                    View Details
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;