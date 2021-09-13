import { gql, useMutation } from '@apollo/client';
import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSignedUser } from '../redux/user/user-actions';
import SignupFormInputs from './signup-form-inputs';

const SignupForm = ({ setSignedUser, onSign }) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
  });
  const onChange = (keyValue) => {
    setValues({ ...values, ...keyValue });
    const key = Object.keys(keyValue)[0];
    setErrors({ ...errors, [key]: null });
  };

  const [registerUser, { loading }] = useMutation(SIGNUP_USER, {
    update(_, result) {
      setSignedUser(result.data.signup);
      onSign();
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

  const passwordsMatch = () => {
    const match = values.password === values.confirmPassword;
    if (!match) {
      setErrors({ ...errors, password: 'Passwords must match' });
    }

    return match;
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (passwordsMatch()) registerUser();
  };

  return (
    <form onSubmit={onSubmit}>
      <SignupFormInputs
        onInputChange={onChange}
        errors={errors}
      ></SignupFormInputs>
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
        className="sign-button"
      >
        {loading ? (
          <CircularProgress color="inherit" size={30} />
        ) : (
          <span>Create Account</span>
        )}
      </Button>
    </form>
  );
};

const SIGNUP_USER = gql`
  mutation signup(
    $nickname: String!
    $email: String!
    $password: String!
    $birthDate: String!
  ) {
    signup(
      signupInput: {
        nickname: $nickname
        email: $email
        password: $password
        birthDate: $birthDate
      }
    ) {
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

export default connect(null, mapDispatchToProps)(SignupForm);
