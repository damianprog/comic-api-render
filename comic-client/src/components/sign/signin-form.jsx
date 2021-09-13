import { gql, useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import './signin-form.scss';

const SigninForm = ({ onSign, setSignedUser }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
    const key = Object.keys(keyValue)[0];
    setErrors({ ...errors, [key]: null });
  };

  const [loginUser, { loading }] = useMutation(SIGNIN_USER, {
    update(_, result) {
      setSignedUser(result.data.signin);
      if (onSign) {
        onSign();
      }
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: {
      nickname: values.nickname,
      email: values.email,
      password: values.password,
      birthDate: values.birthDate,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  const onInputChange = (event) => {
    const keyValue = { [event.target.name]: event.target.value };
    onChange(keyValue);
  };

  return (
    <form className="signin-form" onSubmit={onSubmit}>
      {errors.general && (
        <div className="errors-info">
          {errors.general && <p>{errors.general}</p>}
        </div>
      )}

      {errors.email && <p>{errors.email}</p>}
      <input
        placeholder="Email"
        name="email"
        type="email"
        maxLength="60"
        className={errors.email ? 'error' : ''}
        onChange={onInputChange}
        required
      ></input>
      {errors.password && <p>{errors.password}</p>}
      <input
        placeholder="Password"
        name="password"
        type="password"
        maxLength="25"
        className={errors.password ? 'error' : ''}
        onChange={onInputChange}
        required
      ></input>
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
        className="sign-button"
      >
        {loading ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          <span>Sign In</span>
        )}
      </Button>
    </form>
  );
};

const SIGNIN_USER = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setSignedUser: (user) => dispatch(setSignedUser(user)),
});

export default connect(null, mapDispatchToProps)(SigninForm);
