import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './modals/Login';
import Signup from './modals/Signup';
import axios from 'axios';
import { authEndpoint, baseApiUrl, publishEndpoint } from '../config';

const Home = ({username, apiToken, setUsername, setApiToken}) => {
    const navigate = useNavigate();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

    const [usernameText, setUsernameText] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [publishedUserProjects, setPublishedUserProjects] = useState([]);

    const handleLoginClick = () => {
        setShowLoginModal(true)
    }
    
    const handleSignupClick = () => {
        setShowSignupModal(true)
    }

    const handleUsernameChange = (e) => {
        setUsernameText(e.target.value)
    }

    const handleSearch = async () => {
        if (usernameText == "" || usernameText == null) {
            setPublishedUserProjects([])
            setErrorMessage("Enter a username...");
            return
        }
        try {
            const authResponse = await axios.get(baseApiUrl + authEndpoint + `?username=${usernameText}`);
            const userExists = authResponse.data;
            if (userExists) {
                // show published projects of user
                const dataResponse = await axios.get(baseApiUrl + publishEndpoint + `?username=${usernameText}`)
                const data = dataResponse.data;
                console.log(data)
                setPublishedUserProjects(data)
                setErrorMessage("");
                return
            }
            else {
                // inform user that username not exist
                setPublishedUserProjects([])
                setErrorMessage("Unable to find user...");
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const createClassString = (classes) => {
        let classString = "";
        for (let i = 0; i < classes.length; i++) {
            if (i!=classes.length-1) {
                classString += ` ${classes[i]},`
            }
            else {
                classString += ` ${classes[i]}`
            }
        }
        return classString
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
                <h1 id="main-heading-home">Welcome to EC530 DIYML, {username}</h1>
                <button id="to-dashboard-button" onClick={() => {navigate("/dashboard")}}>Dashboard</button>
                <h1 id="sub-heading-home">Or Search for a User's Published Projects</h1>
                <div id="search-div">
                    <input
                        className="user-input"
                        type="text"
                        value={usernameText}
                        onChange={handleUsernameChange}
                        placeholder="Enter a username"
                    >
                    </input>
                    <button
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                    <p>{errorMessage}</p>
                </div>
                {
                        publishedUserProjects == [] ? <></> : 
                        publishedUserProjects.map((project) => {
                            return (
                                <div className="project-container-home">
                                    <p>
                                        {project['project_name']}
                                    </p>
                                    <p>
                                        {project['project_type']}
                                    </p>
                                    <p>
                                        Classes: {createClassString(project['classes'])}
                                    </p>
                                    <button 
                                        onClick={() => {navigate(`/inference_home/${project['project_name']}`)}} 
                                        className="dash-button infer-button"
                                    >
                                        Make Inference
                                    </button>
                                </div>
                            )
                        })
                    }
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