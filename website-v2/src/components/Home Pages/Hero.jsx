import React from 'react';
import mainImage from '../IMAGES/main.png';

const Hero = () => {
    return (
        <div className="bg-[#0B2847] text-white min-h-screen flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 w-full">
                
                {/* 👇 Responsive Flex Order Fix */}
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
                    
                    {/* Left Content (Text and Button) */}
                    <div className="w-full lg:w-[45%] text-center lg:text-left mt-10 lg:mt-0">
                        <h1 
                            className="text-4xl sm:text-5xl lg:text-5xl leading-tight mb-6 font-serif" 
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: '400' }}
                        >
                            Envisioning the Future with Ethical AI
                        </h1>

                        <p className="text-lg sm:text-xl font-normal mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-95">
                            We build cutting-edge AI solutions for startups and enterprises
                        </p>

                        <a
                            href="#"
                            className="inline-block bg-[#2D4DE8] hover:bg-[#1a39d1] text-white font-medium py-3.5 px-9 text-base transition duration-300 shadow-lg hover:shadow-xl rounded-none"
                        >
                            Get in touch
                        </a>
                    </div>

                    {/* Right Content (Image) */}
                    <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-[650px]">
                            <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
                                <img 
                                    src={mainImage} 
                                    alt="AI Development Platform with RLHF Foundation Models" 
                                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button 
                    className="bg-[#2D4DE8] hover:bg-[#1a39d1] text-white rounded-full w-[70px] h-[70px] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-white"
                    aria-label="Open chat"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Hero;
