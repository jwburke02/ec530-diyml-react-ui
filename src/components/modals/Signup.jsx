import React from 'react';

const Signup = ({ onClose }) => {
  return (
    <div className="signup">
      <div className="signup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Signup Title</h2>
        <p>Signup Content</p>
      </div>
    </div>
  );
};

export default Signup;