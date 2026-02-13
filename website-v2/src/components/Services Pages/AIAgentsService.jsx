import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s6 from '../IMAGES/s6.svg';

const AIAgentsService = () => {
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
                        <h1 style={styles.heroTitle}>AI Agents Development</h1>
                        <p style={styles.heroDescription}>
                            Build intelligent, autonomous agents that work 24/7 to automate complex tasks, enhance decision-making, and augment your team's capabilities. From single-agent systems to sophisticated multi-agent orchestrations, we engineer intelligent agents powered by state-of-the-art AI models.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>Conversational Agents</span>
                            <span style={styles.tagButton}>Autonomous Workflows</span>
                            <span style={styles.tagButton}>Multi-Agent Systems</span>
                            <span style={styles.tagButton}>Task Automation</span>
                            <span style={styles.tagButton}>Decision Intelligence</span>
                            <span style={styles.tagButton}>Safe-Fail Behaviors</span>
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
                            Discuss Agent Project
                        </Link>
                    </div>
                    
                    <div style={styles.rightContent}>
                        <img 
                            src={s6} 
                            alt="AI Agents Development"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Capabilities Section */}
                <section style={styles.contentSection}>
                    <h2 style={styles.sectionTitle}>Agent Capabilities We Build</h2>
                    <div style={styles.capabilityGrid}>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🤖 Conversational Assistants</div>
                            <div style={styles.capabilityDescription}>
                                Natural language agents for customer support, internal Q&A, documentation assistance, and intelligent chatbots with context awareness and multi-turn conversations.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>⚙️ Autonomous Workflows</div>
                            <div style={styles.capabilityDescription}>
                                Agents that automatically execute complex business processes, make decisions based on rules and ML models, and escalate when human judgment is needed.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔍 Research & Analysis Agents</div>
                            <div style={styles.capabilityDescription}>
                                Intelligent agents that gather information, analyze data, synthesize insights, and generate comprehensive reports with minimal human intervention.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>💻 Code Generation Agents</div>
                            <div style={styles.capabilityDescription}>
                                Specialized agents for software development assistance, code review, debugging, documentation generation, and technical problem-solving.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔗 Multi-Agent Systems</div>
                            <div style={styles.capabilityDescription}>
                                Orchestrate multiple specialized agents working collaboratively to solve complex problems that require diverse expertise and perspectives.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>📊 Enterprise Integration</div>
                            <div style={styles.capabilityDescription}>
                                Seamlessly connect agents with your existing systems, APIs, databases, and tools for end-to-end automation and business process integration.
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={styles.ctaContainer}>
                    <h2 style={styles.sectionTitle}>Ready to Deploy Intelligent Agents?</h2>
                    <p style={{fontSize: '1.1rem', color: '#555555', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px'}}>
                        Transform your operations with AI agents that learn, adapt, and deliver measurable business impact.
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
                        Schedule Demo
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default AIAgentsService;
