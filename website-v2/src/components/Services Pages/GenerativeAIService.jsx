import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s6 from '../IMAGES/s6.svg';

const GenerativeAIService = () => {
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
    };

    return (
        <div style={styles.servicesPage}>
            <Navbar />
            <div style={styles.mainContainer}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.leftContent}>
                        <h1 style={styles.heroTitle}>Generative AI Solutions for Your Business</h1>
                        <p style={styles.heroDescription}>
                            Unlock the next level of innovation with our generative-AI services. From creative content generation to workflow automation,
                            we help you harness intelligent systems to drive growth, reduce cost, and stay ahead in a dynamic landscape.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>End-to-End GenAI Development</span>
                            <span style={styles.tagButton}>AI Solution Integration</span>
                            <span style={styles.tagButton}>Strategic GenAI Consulting</span>
                            <span style={styles.tagButton}>Custom Chatbot & Agent Dev</span>
                            <span style={styles.tagButton}>Large Language Models</span>
                            <span style={styles.tagButton}>Prompt Engineering Services</span>
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
                            Contact Us
                        </Link>
                    </div>
                    <div style={styles.rightContent}>
                        <img
                            src={s6}
                            alt="Generative AI"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Additional Section Example – Industries We Serve */}
                <section style={{ padding: '80px 60px', maxWidth: '1400px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '700', marginBottom: '24px', color: '#000' }}>
                        Industries We Serve
                    </h2>
                    <p style={{ fontSize: '1rem', color: '#333', lineHeight: '1.7', marginBottom: '40px' }}>
                        Our generative AI solutions are crafted for a spectrum of industries—from banking & finance to retail, manufacturing, healthcare, and beyond.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#2D4DE8' }}>Banking & Finance</h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                                Advanced analytics, fraud-detection, and personalized customer journeys.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#2D4DE8' }}>Retail</h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                                Enhanced engagement, smart inventory forecasting, impactful experience design.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '12px', color: '#2D4DE8' }}>Healthcare</h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: '1.6' }}>
                                Intelligent patient-care workflows, diagnostic support, next-gen treatment planning.
                            </p>
                        </div>
                        {/* you can add more industry items similarly */}
                    </div>
                </section>

                {/* Call-to-action Footer Section */}
                <section style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f9f9f9' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#000', marginBottom: '16px' }}>
                        Ready to Transform with Generative AI?
                    </h2>
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
                        Speak to Our Experts
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default GenerativeAIService;
