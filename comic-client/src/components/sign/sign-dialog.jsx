import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './sign.scss';
import { DialogContent } from '@material-ui/core';
import Signin from './signin';
import Signup from './signup';
import ToggleHtmlScroll from '../../utils/toggle-html-scroll';
import { Close } from '@material-ui/icons';
import { useEffect } from 'react';

const SignDialog = ({ open, closeDialog, form = 'signin', switchForm }) => {
  useEffect(() => {
    ToggleHtmlScroll(open);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="form-dialog-title"
      className="sign"
      scroll="body"
      disableScrollLock
      disableBackdropClick
    >
      <div className="close-container">
        <Close onClick={closeDialog} />
      </div>
      <DialogContent className="content">
        {form === 'signin' ? (
          <Signin switchForm={switchForm} onSign={closeDialog} />
        ) : (
          <Signup switchForm={switchForm} onSign={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignDialog;
