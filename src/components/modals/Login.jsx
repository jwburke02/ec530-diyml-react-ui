import React, { useState } from 'react';

const Login = ({ onClose }) => {
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameText(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordText(event.target.value);
    }

    return (
        <div className="login">
            <div className="login-content">
                <h2 id="login-title">Login to EC530 DIYML</h2>
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
                <div className="login-button-holder">
                    <button id="login-cancel" onClick={onClose}>Cancel</button>
                    <button id="login-submit" onClick={onClose}>Log In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;