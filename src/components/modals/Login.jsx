import React from 'react';

const Login = ({ onClose }) => {
  return (
    <div className="login">
      <div className="login-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Login Title</h2>
        <p>Login Content</p>
      </div>
    </div>
  );
};

export default Login;