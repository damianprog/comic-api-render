import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './nav-list.scss';

const NavList = ({ signedUser, close }) => {
  const history = useHistory();

  const logout = () => {
    close();
    history.push('/signout');
  };

  return (
    <nav className="nav-list">
      {signedUser ? (
        <ul>
          <Link to={`/profile/${signedUser.nickname}`}>
            <li onClick={close}>My Profile</li>
          </Link>
          <li onClick={logout}>Log Out</li>
        </ul>
      ) : (
        <ul>
          <Link to="/sign/signin">
            <li onClick={close}>Sign In</li>
          </Link>
          <Link to="/sign/signup">
            <li onClick={close}>Join</li>
          </Link>
        </ul>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(NavList);
