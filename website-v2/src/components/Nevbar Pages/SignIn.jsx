import React from 'react';

const SignIn = () => {
    // --- Theme & Animation Setup ---
    const ACCENT_BLUE = '#2D4DE8';
    const TEXT_COLOR = '#1a1a1a';
    const SUBTITLE_COLOR = '#4a4a4a';
    const ANIMATION_DELAY = '0.4s';

    const fadeIn = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;

    try {
        const styleSheet = document.styleSheets[0];
        if (!Array.from(styleSheet.cssRules).some(rule => rule.cssText.includes('@keyframes fadeIn'))) {
            styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
        }
    } catch (e) {}

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
        animation: `fadeIn 0.8s ease-out ${ANIMATION_DELAY} forwards`,
    };

    const inputStyle = {
        width: '100%',
        border: '1px solid #dcdcdc',
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
        backgroundColor: ACCENT_BLUE,
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        padding: '14px 30px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '5px',
        marginBottom: '20px',
        textTransform: 'uppercase',
        transition: 'background-color 0.3s',
    };

    const googleButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: 'white',
        color: '#444',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '12px 20px',
        fontSize: '15px',
        fontWeight: '500',
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'all 0.3s ease',
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
        fontWeight: 'bold',
        textDecoration: 'none',
    };

    // --- Handlers ---
    const handleGoogleSignIn = () => {
        alert('Redirecting to Google Sign-In...');
        // Example: window.location.href = '/auth/google';
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Account sign in</h1>
            <p style={subtitleStyle}>
                Sign in to your account to access your profile, history, and any private pages you've been granted access to.
            </p>

            <div style={formContainerStyle}>
                {/* Google Login Button */}
                <button
                    style={googleButtonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
                    onClick={handleGoogleSignIn}
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google Logo"
                        style={{ width: '20px', height: '20px' }}
                    />
                    Sign in with Google
                </button>

                {/* Email Login */}
                <input 
                    type="email" 
                    placeholder="Email" 
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = ACCENT_BLUE}
                    onBlur={(e) => e.target.style.borderColor = '#dcdcdc'}
                />
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = ACCENT_BLUE}
                    onBlur={(e) => e.target.style.borderColor = '#dcdcdc'}
                />

                <button 
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1a39d1'}
                    onMouseOut={(e) => e.target.style.backgroundColor = ACCENT_BLUE}
                >
                    Sign In
                </button>
                
                <a href="/reset-password" style={{ ...linkStyle, marginBottom: '40px' }}>
                    Reset password
                </a>
                
                <p style={linkStyle}>
                    Not a member?{' '}
                    <a href="/create-account" style={emphasisLinkStyle}>
                        Create account.
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
