import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s6 from '../IMAGES/s6.svg';

const AIStrategyService = () => {
    const styles = {
        servicesPage: {
            fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
        },
        mainContainer: {
            flex: 1,
            paddingTop: '80px',
        },
        heroSection: {
            backgroundColor: '#ffffff',
            padding: '80px 60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '60px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
        },
        leftContent: {
            flex: 1,
            maxWidth: '550px',
        },
        rightContent: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        heroTitle: {
            fontSize: '3.2rem',
            fontWeight: '700',
            marginBottom: '24px',
            color: '#000000',
            lineHeight: '1.2',
            letterSpacing: '-0.5px',
        },
        heroDescription: {
            fontSize: '1rem',
            color: '#333333',
            lineHeight: '1.7',
            marginBottom: '32px',
            fontWeight: '400',
        },
        contactButton: {
            backgroundColor: '#2D4DE8',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            textDecoration: 'none',
        },
        heroImage: {
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
            borderRadius: '8px',
            objectFit: 'cover',
        },
        tagButtonsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '30px',
        },
        tagButton: {
            backgroundColor: '#f5f5f5',
            border: '1px solid #2D4DE8',
            color: '#2D4DE8',
            padding: '10px 18px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
        },
        contentSection: {
            padding: '80px 60px',
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#f9fafb',
        },
        sectionTitle: {
            fontSize: '2.2rem',
            fontWeight: '700',
            marginBottom: '32px',
            color: '#000000',
        },
        capabilityGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
        },
        capabilityCard: {
            backgroundColor: '#ffffff',
            padding: '28px 24px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
        },
        capabilityTitle: {
            fontSize: '1.2rem',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#000000',
        },
        capabilityDescription: {
            fontSize: '0.95rem',
            color: '#555555',
            lineHeight: '1.6',
        },
        ctaContainer: {
            textAlign: 'center',
            padding: '40px 0',
        },
    };

    return (
        <div style={styles.servicesPage}>
            <Navbar />
            
            <div style={styles.mainContainer}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.leftContent}>
                        <h1 style={styles.heroTitle}>AI Strategy Consulting</h1>
                        <p style={styles.heroDescription}>
                            Navigate the complexities of AI adoption with confidence. Our strategic consulting services help organizations identify opportunities, build roadmaps, and establish governance frameworks that align AI initiatives with business objectives for sustainable competitive advantage.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>Strategy & Planning</span>
                            <span style={styles.tagButton}>Opportunity Assessment</span>
                            <span style={styles.tagButton}>Roadmapping</span>
                            <span style={styles.tagButton}>Governance</span>
                            <span style={styles.tagButton}>Change Management</span>
                            <span style={styles.tagButton}>Vendor Selection</span>
                        </div>
                        <Link 
                            to="/contact"
                            style={styles.contactButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#1a39d1';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#2D4DE8';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Schedule Consultation
                        </Link>
                    </div>
                    
                    <div style={styles.rightContent}>
                        <img 
                            src={s6} 
                            alt="AI Strategy Consulting"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Capabilities Section */}
                <section style={styles.contentSection}>
                    <h2 style={styles.sectionTitle}>Our Strategic Approach</h2>
                    <div style={styles.capabilityGrid}>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>📊 AI Readiness Assessment</div>
                            <div style={styles.capabilityDescription}>
                                Evaluate your organization's maturity, data infrastructure, talent, and organizational readiness for AI adoption with comprehensive diagnostic frameworks.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🎯 Opportunity Identification</div>
                            <div style={styles.capabilityDescription}>
                                Uncover high-impact AI opportunities across your business units, assess feasibility, and prioritize initiatives based on value and implementation complexity.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🗺️ Roadmap Development</div>
                            <div style={styles.capabilityDescription}>
                                Create detailed AI transformation roadmaps with clear milestones, resource requirements, timeline, and expected ROI for each initiative phase.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>⚖️ Governance & Ethics</div>
                            <div style={styles.capabilityDescription}>
                                Establish AI governance frameworks, risk management protocols, ethical guidelines, and compliance strategies aligned with regulations and business values.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>👥 Change & Enablement</div>
                            <div style={styles.capabilityDescription}>
                                Develop talent strategies, training programs, and organizational change plans to ensure successful AI adoption and workforce upskilling.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🤝 Vendor & Technology Selection</div>
                            <div style={styles.capabilityDescription}>
                                Evaluate and recommend AI platforms, tools, and vendors that best fit your organization's needs, budget, and long-term technology strategy.
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={styles.ctaContainer}>
                    <h2 style={styles.sectionTitle}>Ready to Build Your AI Strategy?</h2>
                    <p style={{fontSize: '1.1rem', color: '#555555', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px'}}>
                        Let's discuss how our strategic consulting can accelerate your AI transformation journey and unlock new business value.
                    </p>
                    <Link 
                        to="/contact"
                        style={styles.contactButton}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#1a39d1';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#2D4DE8';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Start Your Journey
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default AIStrategyService;
