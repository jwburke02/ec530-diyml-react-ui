import React, { useState } from 'react';

const Signup = ({ onClose }) => {
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameText(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordText(event.target.value);
    }

    return (
        <div className="signup">
            <div className="signup-content">
                <h2 id="signup-title">Sign Up for EC530 DIYML</h2>
                <input
                    className="input-field"
                    type="text"
                    value={usernameText}
                    onChange={handleUsernameChange}
                    placeholder="Username"
                />
                <input
                    className="input-field"
                    type="password"
                    value={passwordText}
                    onChange={handlePasswordChange}
                    placeholder="Password"
                />
                <div className="signup-button-holder">
                    <button id="signup-cancel" onClick={onClose}>Cancel</button>
                    <button id="signup-submit" onClick={onClose}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;