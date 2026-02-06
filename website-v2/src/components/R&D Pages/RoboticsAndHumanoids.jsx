import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import roboticsHumanoidsImg from '../IMAGES/r&d1.jpg';

const RoboticsAndHumanoids = () => {
    const contentStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 20px',
        fontFamily: "'Inter', sans-serif",
        lineHeight: '1.7',
        color: '#333',
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Robotics and Humanoids",
        "description": "AI-driven robotics is transitioning from static automation to dynamic physical intelligence",
        "image": roboticsHumanoidsImg,
        "datePublished": "2025-05-12",
        "author": {
            "@type": "Organization",
            "name": "R&D Department"
        }
    };

    return (
        <>
            <Helmet>
                <title>Robotics and Humanoids - AI-Driven Physical Intelligence | R&D</title>
                <meta name="description" content="Explore how AI-driven robotics is evolving from static automation to dynamic physical intelligence. Learn about humanoids and autonomous machines in unstructured environments." />
                <meta name="keywords" content="robotics, humanoids, AI, automation, physical intelligence, autonomous machines" />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <style>
                {`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                `}
            </style>

            <div style={contentStyle}>
                <Link to="/rnd" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    marginBottom: '30px',
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateX(-5px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateX(0)';
                    }}>
                    ← Back to Research
                </Link>

                <header style={{ textAlign: 'center', marginBottom: '60px', opacity: 0, animation: 'fadeInUp 1s ease-out 0.2s forwards' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '20px',
                        fontFamily: "'Playfair Display', serif",
                    }}>
                        Robotics and Humanoids
                    </h1>
                    <div style={{ color: '#666', fontSize: '1.1rem', marginBottom: '40px' }}>
                        <span>12 May 2025</span> • <span>Robotics</span> • <span>10 min read</span>
                    </div>
                </header>

                <img
                    src={roboticsHumanoidsImg}
                    alt="AI Robotics and Humanoids Technology"
                    style={{
                        width: '100%',
                        height: '500px',
                        objectFit: 'cover',
                        borderRadius: '20px',
                        marginBottom: '50px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        opacity: 0,
                        animation: 'fadeInUp 1s ease-out 0.4s forwards',
                    }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '50px', alignItems: 'start' }}>
                    <article style={{ opacity: 0, animation: 'fadeInUp 1s ease-out 0.6s forwards' }}>
                        <section style={{
                            marginBottom: '40px',
                            padding: '30px',
                            background: 'white',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid #667eea',
                        }}>
                            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>The Evolution of AI-Driven Robotics</h2>
                            <p>Artificial Intelligence is revolutionizing robotics, moving beyond traditional automation to create systems capable of dynamic physical intelligence. This transformation represents a fundamental shift in how machines interact with and adapt to complex, unstructured environments.</p>
                            <p>Modern robotics leverages advanced machine learning algorithms, computer vision, and sensor fusion technologies to enable real-time decision-making and environmental adaptation.</p>
                        </section>

                        <section style={{
                            marginBottom: '40px',
                            padding: '30px',
                            background: 'white',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid #667eea',
                        }}>
                            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>Humanoid Robotics Breakthroughs</h2>
                            <p>Humanoid robots are achieving unprecedented levels of dexterity and mobility. Recent advancements include:</p>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li>Bipedal locomotion in dynamic environments</li>
                                <li>Advanced manipulation capabilities for object interaction</li>
                                <li>Social interaction and emotional intelligence integration</li>
                                <li>Real-time environmental mapping and navigation</li>
                            </ul>
                        </section>

                        <section style={{
                            marginBottom: '40px',
                            padding: '30px',
                            background: 'white',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            borderLeft: '4px solid #667eea',
                        }}>
                            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>Key Technology Components</h2>
                            <div style={{ display: 'grid', gap: '20px' }}>
                                <div>
                                    <h4 style={{ color: '#333', marginBottom: '10px' }}>Perception Systems</h4>
                                    <p>Cameras, LIDAR, and computer vision models for comprehensive environment understanding and object recognition.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#333', marginBottom: '10px' }}>Motion Planning Algorithms</h4>
                                    <p>Optimized for flexibility and obstacle avoidance in dynamic, unstructured environments.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#333', marginBottom: '10px' }}>Reinforcement Learning</h4>
                                    <p>Enables robots to learn complex tasks through interaction and feedback, adapting to new scenarios.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#333', marginBottom: '10px' }}>Natural Interaction</h4>
                                    <p>Voice and NLP-powered humanoids for healthcare, hospitality, and customer service applications.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: '#333', marginBottom: '10px' }}>Human-Robot Collaboration (HRC)</h4>
                                    <p>Safe co-working systems enabling seamless interaction between humans and robots in factories and hospitals.</p>
                                </div>
                            </div>
                        </section>
                    </article>

                    <aside style={{ position: 'sticky', top: '100px', opacity: 0, animation: 'fadeInRight 1s ease-out 0.8s forwards' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            padding: '30px',
                            borderRadius: '15px',
                            marginBottom: '30px',
                        }}>
                            <h3 style={{ marginBottom: '20px', color: 'white' }}>Key Insights</h3>
                            <ul style={{ paddingLeft: '20px' }}>
                                <li>Dynamic physical intelligence represents the next frontier</li>
                                <li>Humanoid robots achieving human-like dexterity</li>
                                <li>Real-time adaptation to unstructured environments</li>
                                <li>Cross-industry applications expanding rapidly</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
};

export default RoboticsAndHumanoids;