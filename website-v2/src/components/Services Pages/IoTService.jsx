import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import s7 from '../IMAGES/s7.svg';

const IoTService = () => {
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
    };

    return (
        <div style={styles.servicesPage}>
            <Navbar />
            
            <div style={styles.mainContainer}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.rightContent}>
                        <img 
                            src={s7} 
                            alt="IoT Services"
                            style={styles.heroImage}
                        />
                    </div>
                    
                    <div style={styles.leftContent}>
                        <h1 style={styles.heroTitle}>Internet of Things (IoT)</h1>
                        <p style={styles.heroDescription}>
                            Integrate sophisticated IoT technologies and advanced analytics to optimize operations. From smart homes to industrial automation, we bring your vision to life with connected, intelligent devices.
                        </p>
                        <div style={styles.tagButtonsContainer}>
                            <span style={styles.tagButton}>IoT Development</span>
                            <span style={styles.tagButton}>Industrial IoT</span>
                            <span style={styles.tagButton}>Firmware</span>
                            <span style={styles.tagButton}>Smart Devices</span>
                            <span style={styles.tagButton}>Sensors</span>
                            <span style={styles.tagButton}>Cloud Integration</span>
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
            </div>
        </div>
    );
};

export default IoTService;