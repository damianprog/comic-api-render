import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoIcon } from '../../assets/logo-icon.svg';
import { ReactComponent as InIcon } from '../../assets/in-icon.svg';
import Hamburger from '../hamburger/hamburger';
import { Search } from '@material-ui/icons';
import SignDialog from '../sign/sign-dialog';
import UserDropdown from '../user-dropdown/user-dropdown';

import './app-header.scss';

const AppHeader = ({ signedUser }) => {
  const [openSignDialog, setOpenSignDialog] = useState(false);
  const [signDialogForm, setSignDialogFormType] = useState('signin');

  const toggleSignDialog = () => {
    setOpenSignDialog(!openSignDialog);
  };

  const openForm = (form) => {
    setSignDialogFormType(form);
    toggleSignDialog();
  };

  const switchSignDialogForm = () => {
    const nextForm = signDialogForm === 'signin' ? 'signup' : 'signin';
    setSignDialogFormType(nextForm);
  };

  return (
    <header className="main-header">
      <div className="main-header-top">
        <div className="sign-in-container">
          {signedUser ? (
            <UserDropdown />
          ) : (
            <Fragment>
              <InIcon />
              <span onClick={() => openForm('signin')}>Sign In</span> |
              <span onClick={() => openForm('signup')}>Join</span>
            </Fragment>
          )}
        </div>
        <Hamburger />
        <Link to="/">
          <LogoIcon className="logo" />
        </Link>
        <div className="search-container">
          <Link to="/search">
            <Search />
          </Link>
        </div>
      </div>
      <SignDialog
        open={openSignDialog}
        closeDialog={toggleSignDialog}
        form={signDialogForm}
        switchForm={switchSignDialogForm}
      ></SignDialog>
    </header>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(AppHeader);
