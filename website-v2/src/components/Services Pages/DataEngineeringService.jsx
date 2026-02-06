import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s5 from '../IMAGES/s5.svg';

const DataEngineeringService = () => {
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
            order: 2,
        },
        rightContent: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            order: 1,
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
                    <div style={styles.rightContent}>
                        <img 
                            src={s5} 
                            alt="Data Engineering"
                            style={styles.heroImage}
                        />
                    </div>
                    
                    <div style={styles.leftContent}>
                        <h1 style={styles.heroTitle}>Data Engineering</h1>
                        <p style={styles.heroDescription}>
                            Transform raw data into a strategic asset. Our data engineering expertise spans pipeline design, cloud infrastructure, real-time processing, and advanced analytics to unlock insights that drive informed decision-making and competitive advantage.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>Data Pipelines</span>
                            <span style={styles.tagButton}>ETL/ELT</span>
                            <span style={styles.tagButton}>Data Warehousing</span>
                            <span style={styles.tagButton}>Big Data</span>
                            <span style={styles.tagButton}>Real-Time Processing</span>
                            <span style={styles.tagButton}>Data Quality</span>
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
                            Contact us
                        </Link>
                    </div>
                </section>

                {/* Capabilities Section */}
                <section style={styles.contentSection}>
                    <h2 style={styles.sectionTitle}>Data Engineering Services</h2>
                    <div style={styles.capabilityGrid}>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔧 Data Pipeline Architecture</div>
                            <div style={styles.capabilityDescription}>
                                Design and implement scalable, fault-tolerant data pipelines that ingest, process, and transform data from multiple sources in batch and real-time modes.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🏗️ Data Warehouse Solutions</div>
                            <div style={styles.capabilityDescription}>
                                Build centralized, optimized data warehouses on cloud platforms (AWS, GCP, Azure) with dimensional modeling, partitioning, and query optimization.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>⚡ Real-Time Data Processing</div>
                            <div style={styles.capabilityDescription}>
                                Implement streaming analytics and event processing using technologies like Apache Kafka, Spark Streaming, and Flink for immediate insights.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🧹 Data Quality & Governance</div>
                            <div style={styles.capabilityDescription}>
                                Establish data quality frameworks, validation rules, lineage tracking, and governance policies to ensure data integrity and compliance.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>📊 Advanced Analytics</div>
                            <div style={styles.capabilityDescription}>
                                Create analytics layers with dimensional modeling, OLAP structures, and BI-ready data marts for self-service analytics and reporting.
                            </div>
                        </div>
                        <div style={styles.capabilityCard}>
                            <div style={styles.capabilityTitle}>🔐 Data Security & Privacy</div>
                            <div style={styles.capabilityDescription}>
                                Implement encryption, access controls, anonymization, and compliance measures for GDPR, HIPAA, and other regulatory requirements.
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section style={styles.ctaContainer}>
                    <h2 style={styles.sectionTitle}>Ready to Unlock Your Data Potential?</h2>
                    <p style={{fontSize: '1.1rem', color: '#555555', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px'}}>
                        Let us architect a data engineering solution that scales with your business and delivers actionable insights.
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
                        Get Started
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default DataEngineeringService;