import React from 'react';
import { Redirect, Route } from 'react-router';

const SignDependentRoute = ({ component: Component, forSigned, ...rest }) => {
  const signedUser = () => {
    const state = JSON.parse(window.localStorage.getItem('persist:root'));
    const stateUser = JSON.parse(state.user);
    const stateSignedUser = stateUser.signedUser;

    return stateSignedUser;
  };

  const signedInOnlyContent = () => {
    return signedUser() ? <Component /> : <Redirect to="/sign/signin" />;
  };

  const signedOutOnlyContent = () => {
    return signedUser() ? <Redirect to="/" /> : <Component />;
  };

  const contentToRender = () => {
    if (forSigned) {
      return signedInOnlyContent();
    } else {
      return signedOutOnlyContent();
    }
  };

  return <Route {...rest} render={() => contentToRender()} />;
};
export default SignDependentRoute;
