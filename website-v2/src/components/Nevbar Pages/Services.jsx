import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import servicesImage from '../IMAGES/s1.png';
import s2 from '../IMAGES/s2.svg';
import s3 from '../IMAGES/s3.svg';
import s4 from '../IMAGES/s4.svg';
import s5 from '../IMAGES/s5.svg';
import s6 from '../IMAGES/s6.svg';
import s7 from '../IMAGES/s7.svg';
import s8 from '../IMAGES/s8.svg';
import i1 from '../IMAGES/i1.png';
import i2 from '../IMAGES/i2.svg';
import i3 from '../IMAGES/i3.png';

const Services = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        phone: '',
        country: '',
        comments: '',
        agreeTerms: false,
    });

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

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
        rightContent: {
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
        },
        heroImage: {
            width: '100%',
            maxWidth: '600px',
            height: 'auto',
            borderRadius: '8px',
            objectFit: 'cover',
        },
        sectionPadding: {
            padding: '60px 60px',
        },
        sectionTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '40px',
            color: '#000000',
            lineHeight: '1.3',
            letterSpacing: '-0.3px',
        },
        serviceTwoColumnSection: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            alignItems: 'center',
            marginBottom: '80px',
        },
        sectionImage: {
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
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
        sectionDescription: {
            fontSize: '1rem',
            color: '#333333',
            lineHeight: '1.7',
            marginBottom: '24px',
            fontWeight: '400',
        },
        insightsSection: {
            padding: '60px 60px',
            backgroundColor: '#ffffff',
        },
        insightsTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '50px',
            color: '#000000',
            textAlign: 'center',
            letterSpacing: '-0.3px',
        },
        insightsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            maxWidth: '1400px',
            margin: '0 auto',
        },
        insightCard: {
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            border: '1px solid #f0f0f0',
        },
        insightImage: {
            width: '100%',
            height: '240px',
            objectFit: 'cover',
            backgroundColor: '#f5f5f5',
            transition: 'all 0.3s ease',
        },
        insightContent: {
            padding: '24px',
        },
        insightCardTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            marginBottom: '12px',
            color: '#000000',
            lineHeight: '1.4',
        },
        insightCardDescription: {
            fontSize: '0.9rem',
            color: '#555555',
            lineHeight: '1.6',
            marginBottom: '16px',
        },
        readMoreButton: {
            color: '#2D4DE8',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.9rem',
            display: 'inline-block',
            transition: 'all 0.2s ease',
        },
        showAllButton: {
            backgroundColor: '#2D4DE8',
            color: 'white',
            border: 'none',
            padding: '12px 36px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            marginTop: '40px',
            display: 'block',
            margin: '40px auto 0',
            transition: 'all 0.3s ease',
        },
        contactFormSection: {
            padding: '60px 60px',
            backgroundColor: '#ffffff',
        },
        contactFormContainer: {
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
        },
        contactFormTitle: {
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#000000',
            textAlign: 'center',
            letterSpacing: '-0.3px',
        },
        contactFormDescription: {
            fontSize: '1rem',
            color: '#555555',
            marginBottom: '16px',
            lineHeight: '1.7',
            textAlign: 'center',
            fontWeight: '400',
        },
        form: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginTop: '30px',
        },
        formFullWidth: {
            gridColumn: '1 / -1',
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
        },
        formLabel: {
            fontSize: '0.9rem',
            color: '#333333',
            marginBottom: '8px',
            fontWeight: '600',
        },
        formInput: {
            padding: '12px 14px',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease',
            backgroundColor: '#ffffff',
            color: '#333333',
        },
        formTextarea: {
            padding: '12px 14px',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            minHeight: '120px',
            resize: 'vertical',
            transition: 'all 0.2s ease',
            backgroundColor: '#ffffff',
            color: '#333333',
        },
        formCheckbox: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            fontSize: '0.9rem',
            color: '#333333',
        },
        checkboxInput: {
            width: '18px',
            height: '18px',
            cursor: 'pointer',
        },
        formLink: {
            color: '#2D4DE8',
            textDecoration: 'none',
            fontWeight: '600',
        },
        formButton: {
            gridColumn: '1 / -1',
            backgroundColor: '#2D4DE8',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            marginTop: '20px',
        },
        ctaSection: {
            backgroundColor: '#ffffff',
            color: '#000000',
            padding: '60px 60px',
            textAlign: 'center',
            borderTop: '1px solid #f0f0f0',
        },
        ctaTitle: {
            fontSize: '2.5rem',
            marginBottom: '16px',
            fontWeight: '700',
            color: '#000000',
            letterSpacing: '-0.3px',
        },
        ctaSubtitle: {
            fontSize: '1rem',
            marginBottom: '32px',
            color: '#555555',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.7',
        },
    };

    const insightsData = [
        {
            id: 1,
            title: 'Generative AI for Regulatory Compliance',
            description: 'Generative AI is reshaping the field of regulatory compliance by enhancing risk management, boosting operational efficiency, and improving compliance monitoring.',
            image: i1,
        },
        {
            id: 2,
            title: 'Generative AI for marketing',
            description: 'Generative AI is transforming the marketing landscape by enhancing content creation, customer interaction, and data analysis.',
            image: i2,
        },
        {
            id: 3,
            title: 'Generative AI in due diligence',
            description: 'Generative AI is reshaping the due diligence landscape, establishing new data analysis and processing benchmarks.',
            image: i3,
        },
    ];

    return (
        <div style={styles.servicesPage}>
            <Navbar />
            
            <div style={styles.mainContainer}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.leftContent}>
                        <h1 style={styles.heroTitle}>Our Services</h1>
                        <p style={styles.heroDescription}>
                            Establish a solid foundation in the evolving digital space with our technology services. From AI-powered solutions that enhance productivity to IoT systems and Web3 applications, our service offerings cater to diverse business needs.
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
                            Contact us
                        </Link>
                    </div>
                    
                    <div style={styles.rightContent}>
                        <img 
                            src={servicesImage} 
                            alt="Our Services"
                            style={styles.heroImage}
                        />
                    </div>
                </section>

                {/* Custom Software Development */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <h2 style={styles.sectionTitle}>Custom Software Development</h2>
                                <p style={styles.sectionDescription}>
                                    We are an AI-focused software development company catering to diverse industries. Whether you want a DeFi app, custom chatbot or IoT-powered asset tracking tool, we have you covered. Transform your ideas into reality with our custom software development services.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>Software Development</span>
                                    <span style={styles.tagButton}>SaaS Development</span>
                                    <span style={styles.tagButton}>Software Consulting</span>
                                    <span style={styles.tagButton}>UI/UX Design</span>
                                    <span style={styles.tagButton}>Web Application</span>
                                </div>
                            </div>
                            <div>
                                <img src={s2} alt="Custom Software Development" style={styles.sectionImage} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blockchain Development */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <img src={s3} alt="Blockchain Development" style={styles.sectionImage} />
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Blockchain Development</h2>
                                <p style={styles.sectionDescription}>
                                    Our expert team combines deep knowledge of blockchain platforms, smart contracts, and dApps to deliver innovative and secure solutions. From finance to gaming, we create trustless and tamper-proof applications.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>Blockchain Dev</span>
                                    <span style={styles.tagButton}>Polygon</span>
                                    <span style={styles.tagButton}>Solana</span>
                                    <span style={styles.tagButton}>Smart Contracts</span>
                                    <span style={styles.tagButton}>dApps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Web3 Development */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <h2 style={styles.sectionTitle}>Web3 Development</h2>
                                <p style={styles.sectionDescription}>
                                    Embrace decentralization with robust Web3 solutions. We specialize in Web3 technologies, APIs, oracles, and languages like Rust and Solidity to deliver secure and transparent applications.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>Web3 Dev</span>
                                    <span style={styles.tagButton}>Rust</span>
                                    <span style={styles.tagButton}>Game Dev</span>
                                    <span style={styles.tagButton}>Metaverse</span>
                                    <span style={styles.tagButton}>NFT</span>
                                </div>
                            </div>
                            <div>
                                <img src={s4} alt="Web3 Development" style={styles.sectionImage} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Data Engineering */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <img src={s5} alt="Data Engineering" style={styles.sectionImage} />
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Data Engineering</h2>
                                <p style={styles.sectionDescription}>
                                    Maximize data value with advanced analytics and ML model training. Our expert team leverages tools and methodologies to extract insights and deliver high-quality AI training data.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>Data Science</span>
                                    <span style={styles.tagButton}>Analytics</span>
                                    <span style={styles.tagButton}>Data Annotation</span>
                                    <span style={styles.tagButton}>Big Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Artificial Intelligence & ML */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <h2 style={styles.sectionTitle}>Artificial Intelligence & ML</h2>
                                <p style={styles.sectionDescription}>
                                    Whether startup or enterprise, our AI & ML services are tailored to meet your needs. We deliver machine learning and deep learning solutions for optimization and innovation.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>AI Development</span>
                                    <span style={styles.tagButton}>ML Engineering</span>
                                    <span style={styles.tagButton}>Computer Vision</span>
                                    <span style={styles.tagButton}>Generative AI</span>
                                    <span style={styles.tagButton}>LLM</span>
                                </div>
                            </div>
                            <div>
                                <img src={s6} alt="Artificial Intelligence & ML" style={styles.sectionImage} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Internet of Things */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <img src={s7} alt="Internet of Things" style={styles.sectionImage} />
                            </div>
                            <div>
                                <h2 style={styles.sectionTitle}>Internet of Things</h2>
                                <p style={styles.sectionDescription}>
                                    Integrate sophisticated IoT technologies and advanced analytics to optimize operations. From smart homes to industrial automation, we bring your vision to life.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>IoT Development</span>
                                    <span style={styles.tagButton}>Industrial IoT</span>
                                    <span style={styles.tagButton}>Firmware</span>
                                    <span style={styles.tagButton}>Smart Devices</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hire Developers */}
                <section style={styles.sectionPadding}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <div style={styles.serviceTwoColumnSection}>
                            <div>
                                <h2 style={styles.sectionTitle}>Hire Expert Developers</h2>
                                <p style={styles.sectionDescription}>
                                    Access our talented pool of developers with deep expertise in diverse technologies. Gain confidence through years of complex project experience and exceptional results.
                                </p>
                                <div style={styles.tagButtonsContainer}>
                                    <span style={styles.tagButton}>DevOps</span>
                                    <span style={styles.tagButton}>Full Stack</span>
                                    <span style={styles.tagButton}>Blockchain</span>
                                    <span style={styles.tagButton}>AI Engineers</span>
                                    <span style={styles.tagButton}>iOS/Android</span>
                                </div>
                            </div>
                            <div>
                                <img src={s8} alt="Hire Developers" style={styles.sectionImage} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section style={styles.contactFormSection}>
                    <div style={styles.contactFormContainer}>
                        <h2 style={styles.contactFormTitle}>Start Your Project Today</h2>
                        <p style={styles.contactFormDescription}>
                            Once you let us know your requirement, our technical expert will schedule a call and discuss your idea in detail.
                        </p>
                        <p style={{...styles.contactFormDescription, fontWeight: '600', color: '#000000'}}>
                            All information will be kept confidential.
                        </p>

                        <form style={styles.form} onSubmit={handleFormSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>First Name*</label>
                                <input 
                                    type="text"
                                    name="firstName"
                                    style={styles.formInput}
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                    placeholder="First Name"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Last Name*</label>
                                <input 
                                    type="text"
                                    name="lastName"
                                    style={styles.formInput}
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                    placeholder="Last Name"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Email*</label>
                                <input 
                                    type="email"
                                    name="email"
                                    style={styles.formInput}
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    placeholder="Company Email"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Company Name*</label>
                                <input 
                                    type="text"
                                    name="company"
                                    style={styles.formInput}
                                    value={formData.company}
                                    onChange={handleFormChange}
                                    placeholder="Company Name"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Job Title*</label>
                                <input 
                                    type="text"
                                    name="jobTitle"
                                    style={styles.formInput}
                                    value={formData.jobTitle}
                                    onChange={handleFormChange}
                                    placeholder="Job Title"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>Phone</label>
                                <input 
                                    type="tel"
                                    name="phone"
                                    style={styles.formInput}
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    placeholder="Phone Number"
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                            </div>

                            <div style={{...styles.formGroup, ...styles.formFullWidth}}>
                                <label style={styles.formLabel}>Country*</label>
                                <select 
                                    name="country"
                                    style={styles.formInput}
                                    value={formData.country}
                                    onChange={handleFormChange}
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                >
                                    <option value="">Select a country</option>
                                    <option value="usa">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="india">India</option>
                                    <option value="canada">Canada</option>
                                </select>
                            </div>

                            <div style={{...styles.formGroup, ...styles.formFullWidth}}>
                                <label style={styles.formLabel}>Comments*</label>
                                <textarea 
                                    name="comments"
                                    style={styles.formTextarea}
                                    value={formData.comments}
                                    onChange={handleFormChange}
                                    placeholder="Tell us about your project..."
                                    onFocus={(e) => e.target.style.borderColor = '#2D4DE8'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                                <p style={{fontSize: '0.85rem', color: '#999999', marginTop: '6px'}}>{formData.comments.length} of 300 max characters</p>
                            </div>

                            <div style={{...styles.formCheckbox, ...styles.formFullWidth}}>
                                <input 
                                    type="checkbox"
                                    name="agreeTerms"
                                    style={styles.checkboxInput}
                                    checked={formData.agreeTerms}
                                    onChange={handleFormChange}
                                />
                                <span>
                                    I agree to the <a href="#" style={styles.formLink}>Terms of use</a> and <a href="#" style={styles.formLink}>Privacy policy</a>.
                                </span>
                            </div>

                            <button 
                                type="submit"
                                style={styles.formButton}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#1a39d1';
                                    e.target.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = '#2D4DE8';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                Start a conversation
                            </button>
                        </form>
                    </div>
                </section>

                {/* Insights Section */}
                <section style={styles.insightsSection}>
                    <div style={{maxWidth: '1400px', margin: '0 auto'}}>
                        <h2 style={styles.insightsTitle}>Insights</h2>
                        <div style={styles.insightsGrid}>
                            {insightsData.map((insight) => (
                                <div 
                                    key={insight.id} 
                                    style={styles.insightCard}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <img 
                                        src={insight.image} 
                                        alt={insight.title}
                                        style={styles.insightImage}
                                    />
                                    <div style={styles.insightContent}>
                                        <h3 style={styles.insightCardTitle}>{insight.title}</h3>
                                        <p style={styles.insightCardDescription}>{insight.description}</p>
                                        <a 
                                            href="#" 
                                            style={styles.readMoreButton}
                                            onMouseEnter={(e) => {
                                                e.target.style.color = '#1a39d1';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.color = '#2D4DE8';
                                            }}
                                        >
                                            Read more →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            style={styles.showAllButton}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#1a39d1';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#2D4DE8';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Show all insights
                        </button>
                    </div>
                </section>

                
            </div>

        </div>
    );
};

export default Services;