import React from 'react';

const CreateAccount = () => {
    // --- Theme & Animation Setup ---
    const MINT_COLOR = '#95d5b2'; 
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
        if (!Array.from(styleSheet.cssRules).some(rule => rule.cssText.includes('@keyframes fadeIn'))) {
            styleSheet.insertRule(fadeIn, styleSheet.cssRules.length);
        }
    } catch (e) { /* Ignore animation injection errors */ }

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
        backgroundColor: '#f5f5f5',
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
        color: TEXT_COLOR,
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
        marginBottom: '25px',
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
        fontWeight: '600',
        textDecoration: 'none',
    };
    
    const recaptchaStyle = {
        color: '#666',
        fontSize: '13px',
        marginTop: '20px',
        textAlign: 'center',
        lineHeight: '1.4',
    };

    // --- Handlers ---
    const handleGoogleSignUp = () => {
        alert('Redirecting to Google Sign-Up...');
        // Example: window.location.href = '/auth/google';
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Create Account</h1>
            
            <p style={subtitleStyle}>
                By creating an account, you may receive newsletters or promotions.
            </p>

            <div style={formContainerStyle}>
                {/* Google Sign-Up Button */}
                <button
                    style={googleButtonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#f5f5f5')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = 'white')}
                    onClick={handleGoogleSignUp}
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google Logo"
                        style={{ width: '20px', height: '20px' }}
                    />
                    Create Account with Google
                </button>

                {/* Normal Form Inputs */}
                <input type="text" placeholder="First name" style={inputStyle} />
                <input type="text" placeholder="Last name" style={inputStyle} />
                <input type="email" placeholder="Email" style={inputStyle} />
                <input type="tel" placeholder="Phone (optional)" style={inputStyle} />
                
                <button 
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#74c69d'}
                    onMouseOut={(e) => e.target.style.backgroundColor = MINT_COLOR}
                >
                    Create Account
                </button>
                
                <p style={linkStyle}>
                    Already have an account?{' '}
                    <a href="/sign-in" style={emphasisLinkStyle}>
                        Sign in
                    </a>
                </p>
                
                <p style={recaptchaStyle}>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="#" style={emphasisLinkStyle}>Privacy Policy</a> and{' '}
                    <a href="#" style={emphasisLinkStyle}>Terms of Service</a> apply.
                </p>
            </div>
        </div>
    );
};

export default CreateAccount;
