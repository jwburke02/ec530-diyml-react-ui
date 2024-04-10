import React from 'react';
import { useState } from 'react';
import Login from './modals/Login'
import Signup from './modals/Signup'

const Home = () => {
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
                <>
                <h1 id="main-heading-home">EC530 DIYML</h1>
                <div className="login-signup-button-holder">
                    <button id="signup-button" onClick={handleSignupClick}>Create Profile</button>
                    <button id="login-button" onClick={handleLoginClick}>Log In</button>
                </div>
                </>
            :
                <></>
            }
            {/* Render both modals conditionally on Home State */}
            {showLoginModal && <Login onClose={() => {
                setShowLoginModal(false)
             }} />}
            {showSignupModal && <Signup onClose={() => {
                setShowSignupModal(false)
            }} />}
        </div>
    );
};

export default Home;