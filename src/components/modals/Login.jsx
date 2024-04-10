import React, { useState } from 'react';
import axios from 'axios';
import { baseApiUrl, authEndpoint } from '../../config'

const Login = ({ onClose }) => {
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const handleUsernameChange = (event) => {
        setUsernameText(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordText(event.target.value);
    }

    const handleLoginSubmit = async() => {
        try {
            const response = await axios.post(baseApiUrl + authEndpoint, {
                username: usernameText,
                password: passwordText,
            });
            console.log(response.data)
        }
        catch (e) {
            console.log(e)
        }
        onClose()
    }

    return (
        <div className="login">
            <div className="login-content">
                <h2 id="login-title">Log In to EC530 DIYML</h2>
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
                    <button id="login-submit" onClick={handleLoginSubmit}>Log In</button>
                </div>
            </div>
        </div>
    );
};

export default Login;