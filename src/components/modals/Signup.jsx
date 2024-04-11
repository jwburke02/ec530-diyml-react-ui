import React, { useState } from 'react';
import axios from 'axios';
import { baseApiUrl, authEndpoint } from '../../config'

const Signup = ({ onClose, setApiToken, setUsername }) => {
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameText(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordText(event.target.value);
    }

    const handleSignupSubmit = async() => {
        try {
            const response = await axios.put(baseApiUrl + authEndpoint, {
                username: usernameText,
                password: passwordText,
            });
            setUsername(response.data['username'])
            setApiToken(response.data['api_token'])
        }
        catch (e) {
            console.log(e)
        }
        onClose()
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
                    <button id="signup-submit" onClick={handleSignupSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Signup;