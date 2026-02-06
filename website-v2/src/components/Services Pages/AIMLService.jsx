import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s6 from '../IMAGES/s6.svg';

const AIMLService = () => {
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
                        <h1 style={styles.heroTitle}>Artificial Intelligence & ML</h1>
                        <p style={styles.heroDescription}>
                            Whether you are a startup looking to leverage AI and ML for disruptive innovation or an established enterprise seeking to optimize operations, our AI & ML services are tailored to meet your specific needs and goals. Let our expertise and passion for AI and machine learning fuel your success in the digital space.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>AI Development</span>
                            <span style={styles.tagButton}>ML Engineering</span>
                            <span style={styles.tagButton}>Computer Vision</span>
                            <span style={styles.tagButton}>Generative AI</span>
                            <span style={styles.tagButton}>LLM</span>
                            <span style={styles.tagButton}>Deep Learning</span>
                            <span style={styles.tagButton}>NLP</span>
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
                            alt="AI & ML Services"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Capabilities Section */}
                <section style={styles.contentSection}>
                    <h2 style={styles.sectionTitle}>AI & ML Expertise Areas</h2>
                    <div style={styles.capabilityGrid}>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🤖 Deep Learning</div>
                            <div style={styles.capabilityDescription}>
                                Advanced neural networks, CNNs, RNNs, transformers, and attention mechanisms for complex pattern recognition and sequence modeling tasks.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🎯 Computer Vision</div>
                            <div style={styles.capabilityDescription}>
                                Image classification, object detection, semantic segmentation, pose estimation, and facial recognition solutions for real-world applications.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>💬 Natural Language Processing</div>
                            <div style={styles.capabilityDescription}>
                                Text analysis, sentiment analysis, machine translation, question answering, and semantic understanding for intelligent language applications.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔮 Predictive Analytics</div>
                            <div style={styles.capabilityDescription}>
                                Time series forecasting, regression analysis, classification models, and anomaly detection for data-driven business insights.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🧠 Large Language Models</div>
                            <div style={styles.capabilityDescription}>
                                LLM fine-tuning, prompt engineering, RAG systems, and generative AI applications powered by state-of-the-art foundation models.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>📊 Model Deployment & MLOps</div>
                            <div style={styles.capabilityDescription}>
                                Production ML pipelines, model versioning, monitoring, retraining automation, and optimization for scalable AI systems.
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={styles.ctaContainer}>
                    <h2 style={styles.sectionTitle}>Ready to Leverage AI & ML?</h2>
                    <p style={{fontSize: '1.1rem', color: '#555555', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px'}}>
                        Transform your business with cutting-edge artificial intelligence and machine learning solutions tailored to your needs.
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
                        Let's Build Together
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default AIMLService;