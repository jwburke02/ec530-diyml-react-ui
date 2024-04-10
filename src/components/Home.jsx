import React from 'react';
import { Link } from 'react-router-dom';

const handleLoginClick = () => {

}

const handleSignupClick = () => {

}

const Home = () => {
  return (
    <div class="main-home-div">
      <h1 id="main-heading-home">EC530 DIYML</h1>
      <div class="login-signup-button-holder">
        <button id="signup-button" onClick={handleSignupClick}>Create Profile</button>
        <button id="login-button" onClick={handleLoginClick}>Log In</button>
      </div>
    </div>
  );
};

export default Home;