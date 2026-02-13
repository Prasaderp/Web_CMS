import React from 'react';
import IndustryTemplate from './IndustriesTemplate';
import e1 from '../IMAGES/e1.jpg';
import e2 from '../IMAGES/e2.jpg';
import e3 from '../IMAGES/e3.jpg';
import e4 from '../IMAGES/e4.jpg';

const EducationIndustry = () => {
    const industryData = {
        title: "Education Technology",
        tagline: "Empowering learners with AI-driven educational solutions",
        description: "Education is undergoing rapid transformation. Our AI solutions enable personalized learning experiences, intelligent tutoring, automated grading, and language accessibility—making quality education accessible to all learners worldwide. We help educational institutions scale personalized learning, reduce educator workload, and break down language barriers with advanced AI technologies.",
        services: [
            { 
                title: 'AI Interview Platform', 
                image: e1, 
                description: 'Intelligent interview preparation and assessment tools with real-time feedback.' 
            },
            { 
                title: 'Text Translation', 
                image: e2, 
                description: 'Break language barriers with accurate real-time text translation.' 
            },
            { 
                title: 'Video Translation', 
                image: e3, 
                description: 'Localize video content with synchronized subtitles and voice-over.' 
            },
            { 
                title: 'Virtual Academic Assistant', 
                image: e4, 
                description: 'AI tutoring and personalized learning support available anytime, anywhere.' 
            },
        ],
        benefits: [
            'Personalize learning at scale with adaptive AI platforms and algorithms',
            'Improve student engagement and learning outcomes by 35%',
            'Reduce educator workload with automated grading and assessment',
            'Enable global access to education through intelligent language translation'
        ]
    };

    return <IndustryTemplate industryData={industryData} />;
};

export default EducationIndustry;
