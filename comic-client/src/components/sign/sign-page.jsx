import React from 'react';
import Signin from './signin';
import Signup from './signup';

import './sign.scss';
import { useParams, withRouter } from 'react-router';

const SignPage = ({ history }) => {
  const { form } = useParams();

  const switchForm = () => {
    const nextForm = form === 'signin' ? 'signup' : 'signin';
    history.push(`/sign/${nextForm}`);
  };

  const onSign = () => {
    history.push('/');
  };

  return (
    <div className="sign-page sign">
      <div className="content">
        {form === 'signin' ? (
          <Signin onSign={onSign} switchForm={switchForm} />
        ) : (
          <Signup onSign={onSign} switchForm={switchForm} />
        )}
      </div>
    </div>
  );
};

export default withRouter(SignPage);
