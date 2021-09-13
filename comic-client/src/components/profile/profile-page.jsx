import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { USER } from '../../graphql/graphql';
import Profile from './profile';
import './profile-page.scss';

const ProfilePage = () => {
  const { nickname } = useParams();

  const { data: { user } = {}, loading } = useQuery(USER, {
    fetchPolicy: 'network-only',
    variables: {
      nickname,
    },
  });

  return (
    <div className="profile-page">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <Profile user={user} />
      )}
    </div>
  );
};

export default ProfilePage;
