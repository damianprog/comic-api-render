import React from 'react';
import { Button, Divider } from '@material-ui/core';

import './sign.scss';
import './signin.scss';
import SigninForm from './signin-form';

const Signin = ({ switchForm, onSign }) => {
  return (
    <div className="signin">
      <h2 className="title">Sign in to your account</h2>
      <SigninForm onSign={onSign} />
      <Divider />
      <div className="create-button-container">
        <Button onClick={switchForm} variant="outlined">
          Create an account
        </Button>
      </div>
    </div>
  );
};

export default Signin;
