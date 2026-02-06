import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s2 from '../IMAGES/s2.svg';

const SoftwareDevelopmentService = () => {
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
                        <h1 style={styles.heroTitle}>Software Design & Development</h1>
                        <p style={styles.heroDescription}>
                            From concept to deployment, we design and build scalable, user-centric software solutions tailored to your unique business needs. Our team combines technical excellence with innovative design to create applications that delight users and drive measurable business outcomes.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>Web Development</span>
                            <span style={styles.tagButton}>Mobile Apps</span>
                            <span style={styles.tagButton}>SaaS Solutions</span>
                            <span style={styles.tagButton}>UI/UX Design</span>
                            <span style={styles.tagButton}>Cloud Architecture</span>
                            <span style={styles.tagButton}>API Development</span>
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
                            Get in Touch
                        </Link>
                    </div>
                    
                    <div style={styles.rightContent}>
                        <img 
                            src={s2} 
                            alt="Software Development"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Capabilities Section */}
                <section style={styles.contentSection}>
                    <h2 style={styles.sectionTitle}>Our Development Excellence</h2>
                    <div style={styles.capabilityGrid}>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>💻 Web Applications</div>
                            <div style={styles.capabilityDescription}>
                                Build responsive, performant web applications using modern frameworks (React, Vue, Angular) with server-side rendering, progressive enhancement, and optimal SEO.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>📱 Mobile Development</div>
                            <div style={styles.capabilityDescription}>
                                Native and cross-platform mobile apps for iOS and Android with intuitive interfaces, offline capabilities, and seamless backend integration.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🏗️ Backend Architecture</div>
                            <div style={styles.capabilityDescription}>
                                Scalable backend systems with microservices, containerization, serverless architecture, and database optimization for high-traffic applications.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🎨 UI/UX Design</div>
                            <div style={styles.capabilityDescription}>
                                Design-first approach with user research, wireframing, prototyping, and iterative testing to create intuitive, beautiful user experiences.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔐 Security & Performance</div>
                            <div style={styles.capabilityDescription}>
                                Security-first development with encryption, authentication, authorization, DDoS protection, and performance optimization for enterprise standards.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔄 DevOps & Deployment</div>
                            <div style={styles.capabilityDescription}>
                                CI/CD pipelines, container orchestration, monitoring, logging, and automated deployment for reliable, predictable software releases.
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={styles.ctaContainer}>
                    <h2 style={styles.sectionTitle}>Ready to Build Something Great?</h2>
                    <p style={{fontSize: '1.1rem', color: '#555555', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px'}}>
                        Let's turn your vision into a robust, scalable software solution that drives business growth.
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
                        Start Your Project
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default SoftwareDevelopmentService;