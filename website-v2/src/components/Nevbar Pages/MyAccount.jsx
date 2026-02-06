import React from 'react';
import { Link } from 'react-router-dom';

const MyAccount = () => {
    const fadeIn = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    try {
        const styleSheet = document.styleSheets[0];
        const rules = Array.from(styleSheet.cssRules).map(rule => rule.name);
        if (!rules.includes('fadeIn')) {
            styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
        }
    } catch (e) {
        console.warn("Could not insert CSS keyframes.", e);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '80px 20px',
            backgroundColor: '#ffffff',
            fontFamily: 'serif',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                opacity: 0,
                animation: 'fadeIn 0.8s ease-out 0.2s forwards',
            }}>
                <h1 style={{
                    fontSize: '42px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: '20px',
                    textAlign: 'center',
                }}>My Account</h1>
                
                <p style={{
                    fontSize: '16px',
                    color: '#666666',
                    textAlign: 'center',
                    marginBottom: '40px',
                }}>Manage your account settings and preferences</p>

                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #dcdcdc',
                    borderRadius: '6px',
                    padding: '30px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '10px' }}>
                            Profile Information
                        </h3>
                        <p style={{ color: '#666666', marginBottom: '5px' }}>
                            <strong>Name:</strong> John Doe
                        </p>
                        <p style={{ color: '#666666', marginBottom: '5px' }}>
                            <strong>Email:</strong> john.doe@example.com
                        </p>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '10px' }}>
                            Account Settings
                        </h3>
                        <button style={{
                            backgroundColor: '#2D4DE8',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginRight: '10px',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                        }}>
                            Edit Profile
                        </button>
                        <button style={{
                            backgroundColor: '#666666',
                            color: 'white',
                            padding: '10px 20px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                        }}>
                            Change Password
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #dcdcdc' }}>
                        <Link to="/" style={{
                            color: '#2D4DE8',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}>
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;