import React from 'react';
import SignupForm from './signup-form';

import './sign.scss';
import './signup.scss';

const Signup = ({ switchForm, onSign }) => {
  return (
    <div className="signup">
      <h2 className="title">Create your account</h2>
      <SignupForm onSign={onSign} />
      <p className="signin-info">
        Already have an account? <b onClick={switchForm}>Sign In</b>
      </p>
    </div>
  );
};

export default Signup;
