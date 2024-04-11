import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './modals/Login';
import Signup from './modals/Signup';

const Home = ({username, apiToken, setUsername, setApiToken}) => {
    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }
    
    const handleSignupClick = () => {
        setShowSignupModal(true)
    }

    return (
        <div className="main-home-div">
            {/* Render main screen conditionally on Home State */}
            {(!showLoginModal & !showSignupModal) ?
                username==null?
                <>
                <h1 id="main-heading-home">EC530 DIYML</h1>
                <div className="login-signup-button-holder">
                    <button id="signup-button" onClick={handleSignupClick}>Create Profile</button>
                    <button id="login-button" onClick={handleLoginClick}>Log In</button>
                </div>
                </>
                :
                <>
                <h1 id="main-heading-home">Welcome to EC530 DIYML</h1>
                <button id="to-dashboard-button" onClick={() => {navigate("/dashboard")}}>Dashboard</button>
                </>
            :
                <></>
            }
            {/* Render both modals conditionally on Home State */}
            {showLoginModal && <Login setApiToken={setApiToken} setUsername={setUsername} onClose={() => {
                setShowLoginModal(false)
             }} />}
            {showSignupModal && <Signup setApiToken={setApiToken} setUsername={setUsername} onClose={() => {
                setShowSignupModal(false)
            }} />}
        </div>
    );
};

export default Home;