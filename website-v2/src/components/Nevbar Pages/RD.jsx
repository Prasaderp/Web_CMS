import React from 'react';
import { Link } from 'react-router-dom';

// --- Article Image Imports ---
import roboticsHumanoidsImg from '../IMAGES/r&d1.jpg'; 
import cybersecurityAISystemsImg from '../IMAGES/r&d2.jpg'; 
import aiEthicsGovernanceImg from '../IMAGES/r&d3.jpg'; 
import kpisScalingAIProductsImg from '../IMAGES/r&d4.jpg'; 

// --- Constants & Styling ---
const MAIN_FONT = "'Playfair Display', Georgia, serif";
const ACCENT_BLUE = '#2D4DE8';
const ACCENT_PURPLE = '#8B5CF6';
const TEXT_COLOR_DARK = '#1a1a1a';
const TEXT_COLOR_MEDIUM = '#333';
const TEXT_COLOR_LIGHT = '#555';
const META_TEXT_COLOR = '#888';
const BORDER_COLOR_LIGHT = '#eeeeee';
const CARD_BG = '#ffffff';
const CARD_SHADOW = '0 8px 30px rgba(0,0,0,0.08)';
const CARD_SHADOW_HOVER = '0 20px 50px rgba(45, 77, 232, 0.15)';

// --- Enhanced Animation Keyframes ---
const enhancedAnimations = `
    @keyframes fadeInSlide {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes floatCard {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(0.5deg); }
        100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;

try {
    const styleSheet = document.styleSheets[0];
    const rules = Array.from(styleSheet.cssRules).map(rule => rule.cssText);
    if (!rules.some(rule => rule.includes('@keyframes fadeInSlide'))) {
        styleSheet.insertRule(enhancedAnimations, styleSheet.cssRules.length);
    }
} catch (e) {
    console.warn("Animation keyframes insertion failed.", e);
}

// --- Article Data with Proper Routes ---
const articles = [
    {
        id: 1,
        date: '12 May 2025',
        category: 'Robotics',
        title: 'Robotics and Humanoids',
        summary: 'AI-driven robotics is transitioning from static automation to dynamic physical intelligence. Humanoids and autonomous machines are becoming increasingly capable in unstructured environments.',
        image: roboticsHumanoidsImg,
        route: '/rnd/robotics-humanoids',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        id: 2,
        date: '12 May 2025',
        category: 'Cybersecurity',
        title: 'Cybersecurity in AI Systems',
        summary: 'AI systems are increasingly the target and the tool of cyber threats. Securing AI models, data pipelines, and inference endpoints is a top priority in any scaled deployment.',
        image: cybersecurityAISystemsImg,
        route: '/rnd/cybersecurity-ai-systems',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        id: 3,
        date: '12 May 2025',
        category: 'AI Ethics',
        title: 'Implementation of Ethical Aspects in AI Products & AI Governance',
        summary: 'As AI becomes more autonomous, ethical implementation isn\'t a bonus—it\'s a boardroom mandate. Responsible AI ensures fairness, transparency, and accountability at every touchpoint.',
        image: aiEthicsGovernanceImg,
        route: '/rnd/ai-ethics-governance',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
        id: 4,
        date: '12 May 2025',
        category: 'Research',
        title: 'KPIs for Scaling AI Products',
        summary: 'Scaling AI products is not just about accuracy—it\'s about repeatability, adoption, and impact. Key Performance Indicators (KPIs) are vital to quantify the maturity, ROI, and business integration of your AI solutions.',
        image: kpisScalingAIProductsImg,
        route: '/rnd/kpis-scaling-ai-products',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
];

const categories = ['All Posts', 'AI Ethics', 'Cybersecurity', 'Research', 'Robotics'];

// --- Enhanced Article Card Component with React Router Link ---
const ArticleCard = ({ article, index }) => {
    const animationDelay = `${0.3 + index * 0.15}s`;
    const [isHovered, setIsHovered] = React.useState(false);

    const cardStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '50px',
        padding: '30px',
        backgroundColor: CARD_BG,
        borderRadius: '20px',
        boxShadow: isHovered ? CARD_SHADOW_HOVER : CARD_SHADOW,
        opacity: 0,
        animation: `fadeInSlide 0.8s ease-out ${animationDelay} forwards, ${isHovered ? 'floatCard 3s ease-in-out infinite' : 'none'}`,
        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        overflow: 'hidden',
        border: `1px solid ${BORDER_COLOR_LIGHT}`,
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
    };

    const shimmerOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: article.gradient,
        backgroundSize: '200% 200%',
        animation: isHovered ? 'gradientShift 2s ease infinite' : 'none',
    };

    const imageWrapperStyle = {
        position: 'relative',
        flexShrink: 0,
        width: '240px',
        height: '160px',
        marginRight: '30px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        transform: isHovered ? 'perspective(1000px) rotateY(5deg) scale(1.05)' : 'none',
    };

    const imgStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(1) saturate(1)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    };

    const categoryBadgeStyle = {
        position: 'absolute',
        top: '12px',
        left: '12px',
        background: article.gradient,
        color: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        zIndex: 2,
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    };

    const textContentStyle = { 
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
    };

    const metaStyle = { 
        fontSize: '13px', 
        color: META_TEXT_COLOR, 
        marginBottom: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        fontWeight: '500' 
    };

    const titleStyle = { 
        fontSize: '26px', 
        fontWeight: 'bold', 
        fontFamily: MAIN_FONT, 
        background: isHovered ? article.gradient : 'none',
        backgroundClip: isHovered ? 'text' : 'none',
        WebkitBackgroundClip: isHovered ? 'text' : 'none',
        WebkitTextFillColor: isHovered ? 'transparent' : TEXT_COLOR_MEDIUM,
        marginBottom: '15px', 
        lineHeight: '1.3', 
        transition: 'all 0.4s ease-in-out',
    };

    const summaryStyle = { 
        fontSize: '16px', 
        color: TEXT_COLOR_LIGHT, 
        lineHeight: '1.7', 
        marginBottom: '20px' 
    };

    const continueReadingStyle = { 
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '15px', 
        fontWeight: '700', 
        color: ACCENT_BLUE, 
        textDecoration: 'none',
        padding: '8px 0',
        position: 'relative',
        overflow: 'hidden',
    };

    const arrowStyle = {
        marginLeft: '8px',
        transform: isHovered ? 'translateX(5px)' : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
    };

    return (
        <Link 
            to={article.route}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={cardStyle}>
                <div style={shimmerOverlayStyle}></div>
                
                <div style={imageWrapperStyle}>
                    <div style={categoryBadgeStyle}>{article.category}</div>
                    <img src={article.image} alt={article.title} style={imgStyle} />
                </div>
                
                <div style={textContentStyle}>
                    <p style={metaStyle}>
                        {article.date} <span style={{ margin: '0 8px', color: '#ddd' }}>|</span> {article.category}
                    </p>
                    <h2 style={titleStyle}>{article.title}</h2>
                    <p style={summaryStyle}>{article.summary}</p>
                    <div style={continueReadingStyle}>
                        Continue Reading
                        <span style={arrowStyle}>→</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// --- Main R&D Component ---
const RND = () => {
    const [activeCategory, setActiveCategory] = React.useState('All Posts');

    const containerStyle = {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #f0f4f8 100%)',
        minHeight: '100vh',
        padding: '40px 20px',
    };

    const headerStyle = {
        fontSize: 'clamp(42px, 5vw, 72px)',
        fontWeight: 'bold',
        fontFamily: MAIN_FONT,
        background: 'linear-gradient(135deg, #2D4DE8 0%, #8B5CF6 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '15px',
        textAlign: 'center',
        paddingTop: '40px',
        opacity: 0,
        animation: 'fadeInSlide 0.8s ease-out 0s forwards',
        letterSpacing: '-0.5px',
    };

    const subtitleStyle = {
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: TEXT_COLOR_LIGHT,
        textAlign: 'center',
        maxWidth: '700px',
        margin: '0 auto 80px',
        opacity: 0,
        animation: 'fadeInSlide 0.8s ease-out 0.2s forwards',
        lineHeight: '1.6',
        fontWeight: '400',
    };

    const categoryTitleStyle = {
        fontSize: '28px',
        fontWeight: 'bold',
        fontFamily: MAIN_FONT,
        color: TEXT_COLOR_DARK,
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: `3px solid ${BORDER_COLOR_LIGHT}`,
        opacity: 0,
        animation: 'fadeInSlide 0.8s ease-out 0.6s forwards',
        position: 'relative',
    };

    const categoryTitleUnderline = {
        position: 'absolute',
        bottom: '-3px',
        left: '0',
        width: '60px',
        height: '3px',
        background: 'linear-gradient(135deg, #2D4DE8 0%, #8B5CF6 100%)',
        borderRadius: '2px',
    };

    const categoryLinkBaseStyle = {
        display: 'flex',
        alignItems: 'center',
        fontSize: '17px',
        color: TEXT_COLOR_LIGHT,
        padding: '16px 20px',
        textDecoration: 'none',
        borderRadius: '12px',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        opacity: 0,
        cursor: 'pointer',
        fontWeight: 'normal',
        marginBottom: '8px',
        position: 'relative',
        overflow: 'hidden',
    };

    const getCategoryLinkAnimatedStyle = (index) => ({
        ...categoryLinkBaseStyle,
        animation: `fadeInSlide 0.8s ease-out ${0.8 + index * 0.1}s forwards`,
    });

    const categoryIconStyle = {
        marginRight: '12px',
        fontSize: '20px',
        transition: 'transform 0.3s ease-in-out',
    };

    return (
        <div style={containerStyle}>
            <div className="max-w-7xl mx-auto">
                <h1 style={headerStyle}>Research & Development</h1>
                <p style={subtitleStyle}>
                    Explore our cutting-edge research, insights, and technological breakthroughs 
                    that drive the future of ethical AI development and innovation.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Articles */}
                    <div className="lg:col-span-2">
                        {articles
                            .filter(article => activeCategory === 'All Posts' || article.category === activeCategory)
                            .map((article, index) => (
                                <ArticleCard key={article.id} article={article} index={index} />
                            ))}
                    </div>

                    {/* Right Column: Categories */}
                    <div className="lg:col-span-1 pt-8 lg:pt-0">
                        <div style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={categoryTitleStyle}>
                                Categories
                                <div style={categoryTitleUnderline}></div>
                            </h3>
                            <div className="flex flex-col">
                                {categories.map((category, index) => {
                                    const isActive = category === activeCategory;
                                    const icons = ['📚', '⚖️', '🛡️', '🔬', '🤖'];
                                    
                                    return (
                                        <div 
                                            key={category} 
                                            onClick={() => setActiveCategory(category)}
                                            style={{
                                                ...getCategoryLinkAnimatedStyle(index),
                                                background: isActive ? 'linear-gradient(135deg, #2D4DE8 0%, #8B5CF6 100%)' : 'transparent',
                                                color: isActive ? 'white' : TEXT_COLOR_LIGHT,
                                                fontWeight: isActive ? '700' : 'normal',
                                                transform: isActive ? 'translateX(8px)' : 'translateX(0)',
                                                boxShadow: isActive ? '0 10px 25px rgba(45, 77, 232, 0.3)' : 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive) {
                                                    e.target.style.background = 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)';
                                                    e.target.style.color = ACCENT_BLUE;
                                                    e.target.style.transform = 'translateX(8px)';
                                                }
                                                const icon = e.target.querySelector('span');
                                                if (icon) icon.style.transform = 'scale(1.2)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive) {
                                                    e.target.style.background = 'transparent';
                                                    e.target.style.color = TEXT_COLOR_LIGHT;
                                                    e.target.style.transform = 'translateX(0)';
                                                }
                                                const icon = e.target.querySelector('span');
                                                if (icon) icon.style.transform = 'scale(1)';
                                            }}
                                        >
                                            <span style={categoryIconStyle}>{icons[index]}</span>
                                            {category}
                                            {isActive && (
                                                <span style={{
                                                    marginLeft: 'auto',
                                                    fontSize: '14px',
                                                    animation: 'fadeInSlide 0.3s ease-out'
                                                }}>✓</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Additional Info Card */}
                            <div style={{
                                marginTop: '40px',
                                padding: '25px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                borderRadius: '16px',
                                color: 'white',
                                opacity: 0,
                                animation: 'fadeInSlide 0.8s ease-out 1.2s forwards',
                                boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
                            }}>
                                <h4 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '700' }}>
                                    Stay Updated
                                </h4>
                                <p style={{ fontSize: '14px', lineHeight: '1.6', opacity: 0.9 }}>
                                    Get the latest research insights and AI developments delivered to your inbox. Join our community of innovators.
                                </p>
                                <button style={{
                                    marginTop: '15px',
                                    padding: '12px 24px',
                                    background: 'rgba(255,255,255,0.2)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.3)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'rgba(255,255,255,0.2)';
                                    e.target.style.transform = 'translateY(0)';
                                }}>
                                    Subscribe to Newsletter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RND;