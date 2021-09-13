import React, { useEffect } from 'react';
import EditProfile from './edit-profile';
import { useLazyQuery } from '@apollo/client';
import { USER } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './edit-profile-page.scss';

const EditProfilePage = ({ signedUser }) => {
  const [getUser, { data: { user: profileUser } = {} }] = useLazyQuery(USER, {
    variables: {
      nickname: signedUser ? signedUser.nickname : '',
    },
  });

  useEffect(() => {
    if (signedUser) {
      getUser();
    }
  }, [signedUser]);

  return (
    <div className="edit-profile-page">
      <div className="wrapper">
        {profileUser && <EditProfile profileUser={profileUser} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(EditProfilePage);
