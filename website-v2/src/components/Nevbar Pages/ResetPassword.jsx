import React from 'react';

const ResetPassword = () => {
    // --- Theme & Animation Setup ---
    const MINT_COLOR = '#95d5b2'; // Primary button color from image 2
    const TEXT_COLOR = '#1a1a1a';
    const SUBTITLE_COLOR = '#4a4a4a';
    const ACCENT_BLUE = '#2D4DE8'; 

    const fadeIn = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    try {
        const styleSheet = document.styleSheets[0];
        if (!Array.from(styleSheet.cssRules).some(rule => rule.includes('@keyframes fadeIn'))) {
            styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
        }
    } catch (e) { /* Animation insertion failed silently */ }

    // --- Component Styles ---
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px',
        minHeight: '100vh',
        backgroundColor: 'white',
        fontFamily: 'serif',
    };

    const titleStyle = {
        fontSize: '42px',
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: '20px',
        opacity: 0,
        animation: 'fadeIn 0.8s ease-out 0s forwards',
    };

    const subtitleStyle = {
        fontSize: '16px',
        color: SUBTITLE_COLOR,
        textAlign: 'center',
        maxWidth: '450px',
        marginBottom: '40px',
        lineHeight: '1.6',
        opacity: 0,
        animation: 'fadeIn 0.8s ease-out 0.2s forwards',
    };

    const formContainerStyle = {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        animation: 'fadeIn 0.8s ease-out 0.4s forwards',
    };

    const inputStyle = {
        width: '100%',
        backgroundColor: '#f5f5f5', // Light gray background for input
        border: '1px solid #f5f5f5',
        borderRadius: '4px',
        padding: '12px 15px',
        fontSize: '16px',
        color: TEXT_COLOR,
        marginBottom: '20px',
        outline: 'none',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box',
    };

    const buttonStyle = {
        backgroundColor: MINT_COLOR,
        color: TEXT_COLOR, // Dark text on mint button
        border: 'none',
        borderRadius: '25px',
        padding: '12px 30px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        marginBottom: '20px',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s',
    };

    const linkStyle = {
        color: SUBTITLE_COLOR,
        fontSize: '15px',
        textDecoration: 'none',
        cursor: 'pointer',
        textAlign: 'center',
    };

    const emphasisLinkStyle = {
        color: ACCENT_BLUE, 
        fontWeight: '600',
        textDecoration: 'none',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Reset password</h1>
            
            <p style={subtitleStyle}>
                Enter your email address, and we'll send you a password reset link.
            </p>

            <div style={formContainerStyle}>
                
                <input 
                    type="email" 
                    placeholder="Email address" 
                    style={inputStyle}
                    onFocus={(e) => e.target.style.border = `1px solid ${MINT_COLOR}`}
                    onBlur={(e) => e.target.style.border = '1px solid #f5f5f5'}
                />
                
                <button 
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#74c69d'}
                    onMouseOut={(e) => e.target.style.backgroundColor = MINT_COLOR}
                >
                    Send Reset Link
                </button>
                
                <p style={linkStyle}>
                    Don't need to reset your password? {' '}
                    <a href="/sign-in" style={emphasisLinkStyle}>
                        Sign in.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;