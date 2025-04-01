import { useEffect, useState } from 'react';
import './AuthPages.css';

const Login = ({ onLogin, onNavigateToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (value = email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email address (name@domain.com)');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (value = password) => {
        if (!value) {
            setPasswordError('Password is required');
            return false;
        } else if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        try {
            const success = onLogin({ email, password });
            if (!success) {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            setLoginError('Login failed. Please try again.');
        }
    };

    return (
        <div className="SignUpPage">
            <div className="Header">
                <div className="Logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="42" viewBox="0 0 44 42" fill="none">
                        <path
                            d="M22.8347 0.0168568C11.2114 -0.443407 1.41531 8.57812 0.953674 20.167C0.492043 31.7576 9.54037 41.5246 21.1654 41.9831C32.7887 42.4434 42.5848 33.4219 43.0464 21.833C43.508 10.2442 34.4579 0.475371 22.8347 0.0168568ZM31.7268 30.781C31.5615 31.0698 31.2881 31.2813 30.9666 31.3692C30.6451 31.4572 30.3017 31.4143 30.0119 31.2501C27.2272 29.6703 24.1667 28.6327 20.9934 28.1927C17.8216 27.7436 14.5932 27.8998 11.4799 28.653C11.1622 28.7145 10.8329 28.6515 10.5606 28.4773C10.2882 28.303 10.0936 28.0308 10.0172 27.7173C9.94082 27.4037 9.98855 27.0728 10.1505 26.7934C10.3124 26.514 10.576 26.3076 10.8867 26.2169C14.3094 25.3874 17.8287 25.2176 21.3444 25.7094C24.8602 26.2029 28.1952 27.3334 31.2564 29.0695C31.4 29.1511 31.5261 29.2601 31.6274 29.3902C31.7288 29.5204 31.8034 29.6692 31.8471 29.8281C31.8908 29.9871 31.9027 30.153 31.882 30.3165C31.8614 30.48 31.8086 30.6379 31.7268 30.781ZM34.4948 25.2684C34.3929 25.4568 34.2547 25.6233 34.0881 25.7584C33.9216 25.8935 33.7299 25.9945 33.5242 26.0556C33.3184 26.1167 33.1026 26.1368 32.889 26.1146C32.6755 26.0924 32.4684 26.0285 32.2797 25.9264C29.0188 24.1687 25.4687 23.007 21.7973 22.4963C18.1269 21.9782 14.3931 22.1193 10.7726 22.9128C10.5628 22.9592 10.3459 22.9638 10.1343 22.9264C9.92272 22.889 9.72063 22.8104 9.53962 22.6949C9.3586 22.5795 9.20223 22.4295 9.07947 22.2537C8.9567 22.0779 8.86997 21.8796 8.82423 21.6703C8.77772 21.4611 8.77308 21.2449 8.81058 21.0339C8.84809 20.8229 8.92699 20.6215 9.04278 20.441C9.15856 20.2605 9.30894 20.1046 9.4853 19.9822C9.66165 19.8598 9.86051 19.7733 10.0705 19.7277C14.0707 18.8494 18.1966 18.6941 22.2519 19.2692C26.3092 19.8309 30.2324 21.1142 33.8348 23.0581C34.6282 23.4868 34.9231 24.4756 34.4948 25.2684ZM37.563 19.0539C37.3165 19.5258 36.8923 19.8807 36.3834 20.0409C35.8746 20.201 35.3229 20.1532 34.8494 19.908C31.0521 17.9396 26.9454 16.6328 22.7065 16.0438C18.4689 15.4446 14.1598 15.5719 9.96514 16.4201C9.4453 16.5186 8.90745 16.409 8.46813 16.1149C8.02882 15.8208 7.72344 15.3659 7.61815 14.8489C7.51287 14.3318 7.61616 13.7943 7.90566 13.3526C8.19515 12.911 8.64752 12.6009 9.16475 12.4895C13.807 11.55 18.5762 11.408 23.2665 12.0695C27.9581 12.7224 32.5035 14.1695 36.7064 16.3484C37.6911 16.8594 38.0755 18.0704 37.563 19.0539Z"
                            fill="white" />
                    </svg>
                </div>
                <div className="HeadingText">Log in to Spotify</div>
            </div>
            <div className="Middle">
                <button className="Button">
                    <div className="SocialIcon"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20"
                        viewBox="0 0 21 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M20.3 10.2273C20.3 9.5182 20.2364 8.8364 20.1182 8.1819H10.7V12.0501H16.0818C15.85 13.3001 15.1455 14.3592 14.0864 15.0682V17.5773H17.3182C19.2091 15.8364 20.3 13.2728 20.3 10.2273Z"
                            fill="#4285F4" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.7001 19.9999C13.4001 19.9999 15.6636 19.1045 17.3182 17.5773L14.0864 15.0682C13.191 15.6682 12.0455 16.0226 10.7001 16.0226C8.09555 16.0226 5.891 14.2635 5.10464 11.8999H1.76373V14.4908C3.40919 17.759 6.791 19.9999 10.7001 19.9999Z"
                            fill="#34A853" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.10464 11.8999C4.90464 11.2999 4.79092 10.659 4.79092 9.9999C4.79092 9.3409 4.90456 8.6999 5.10456 8.0999V5.50903H1.76365C1.08637 6.85903 0.700012 8.3863 0.700012 9.9999C0.700012 11.6136 1.08645 13.1408 1.76373 14.4908L5.10464 11.8999Z"
                            fill="#FBBC05" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.7001 3.97727C12.1683 3.97727 13.4864 4.48182 14.5228 5.47273L17.391 2.60455C15.6592 0.99091 13.3955 0 10.7001 0C6.791 0 3.40911 2.24085 1.76365 5.50903L5.10456 8.0999C5.89092 5.73626 8.09555 3.97727 10.7001 3.97727Z"
                            fill="#EA4335" />
                    </svg>
                    </div>
                    <div className="TextBold">Continue with Google</div>
                </button>
                <button className="Button">
                    <div className="SocialIcon"> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20"
                        viewBox="0 0 21 20" fill="none">
                        <path
                            d="M10.5 19.9999C16.0228 19.9999 20.5 15.5228 20.5 9.99991C20.5 4.47706 16.0228 -9.15527e-05 10.5 -9.15527e-05C4.97715 -9.15527e-05 0.5 4.47706 0.5 9.99991C0.5 15.5228 4.97715 19.9999 10.5 19.9999Z"
                            fill="white" />
                        <path
                            d="M20.5 9.99991C20.5 4.47706 16.0228 -9.15527e-05 10.5 -9.15527e-05C4.97715 -9.15527e-05 0.5 4.47706 0.5 9.99991C0.5 14.9909 4.157 19.1279 8.938 19.8779V12.8909H6.398V9.99991H8.938V7.79691C8.938 5.29091 10.43 3.90691 12.715 3.90691C13.808 3.90691 14.953 4.10191 14.953 4.10191V6.56191H13.693C12.45 6.56191 12.063 7.33291 12.063 8.12491V9.99991H14.836L14.393 12.8899H12.063V19.8779C16.843 19.1279 20.5 14.9909 20.5 9.99991Z"
                            fill="#1877F2" />
                    </svg>
                    </div>
                    <div className="TextBold">Continue with Facebook</div>
                </button>
                <button className="Button">
                    <div className="SocialIcon"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22"
                        viewBox="0 0 18 22" fill="none">
                        <path
                            d="M12.2465 3.51291C12.9245 2.68991 13.4025 1.56691 13.4025 0.432908C13.4025 0.277908 13.3925 0.122908 13.3695 -9.15527e-05C12.2575 0.0439084 10.9235 0.733908 10.1345 1.66791C9.50051 2.37891 8.92251 3.51291 8.92251 4.64691C8.92251 4.82491 8.95651 4.99091 8.96751 5.04691C9.03351 5.05791 9.14551 5.07991 9.26751 5.07991C10.2575 5.07991 11.5015 4.41291 12.2465 3.51291ZM13.0245 5.31291C11.3685 5.31291 10.0125 6.32491 9.14451 6.32491C8.22251 6.32491 7.02151 5.37991 5.57651 5.37991C2.83051 5.37991 0.0515137 7.64791 0.0515137 11.9179C0.0515137 14.5859 1.07451 17.3979 2.35251 19.2109C3.44251 20.7439 4.39851 21.9999 5.77651 21.9999C7.13251 21.9999 7.73351 21.0999 9.42251 21.0999C11.1345 21.0999 11.5235 21.9779 13.0245 21.9779C14.5145 21.9779 15.5045 20.6099 16.4485 19.2649C17.4935 17.7199 17.9385 16.2189 17.9485 16.1419C17.8605 16.1189 15.0145 14.9519 15.0145 11.6949C15.0145 8.87091 17.2495 7.60391 17.3825 7.50391C15.9035 5.38091 13.6475 5.31291 13.0245 5.31291Z"
                            fill="white" />
                    </svg>
                    </div>
                    <div className="TextBold">Continue with Apple</div>
                </button>
                <button className="Button">
                    <div className="TextBold">Continue with phone number</div>
                </button>
            </div>
            <div className="Footer">
                <form onSubmit={handleSubmit} className="Footer">
                    <div className="TextBold">Email Address</div>
                    <div className={`Form ${emailError ? 'FormError' : ''}`}>
                        <input
                            type="email"
                            id="loginEmail"
                            className="FormInput"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={() => validateEmail()}
                        />
                    </div>
                    {emailError && <div className="ErrorMessage">{emailError}</div>}

                    <div className="TextBold">Password</div>
                    <div className={`Form ${passwordError ? 'FormError' : ''}`}>
                        <input
                            type="password"
                            id="loginPassword"
                            className="FormInput"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={() => validatePassword()}
                        />
                    </div>
                    {passwordError && <div className="ErrorMessage">{passwordError}</div>}

                    {loginError && <div style={{ color: '#e91429' }}>{loginError}</div>}

                    <button type="submit" className="GreenButton">
                        <div className="TextBold">Log in</div>
                    </button>
                </form>
                <div className="FooterText">
                    <div className="TextLight">Don't have an account?</div>
                    <button
                        onClick={onNavigateToSignUp}
                        className="TextBold"
                        style={{ background: 'none', border: 'none', padding: 0, color: '#1ed760' }}
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;