import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { USER_ACTIVITIES } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { DateRange } from '@material-ui/icons';

import './profile.scss';
import ProfileAvatarBackground from './profile-avatar-background';
import { Link } from 'react-router-dom';
import UserActivitiesList from '../user-activities/user-activities-list';
import EditProfileActivator from '../edit-profile/edit-profile-activator';
import ProfilePageDetailsStatistics from './profile-details-statistics';
import ProfileDetailsAbout from './profile-details-about';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

const Profile = ({ user, signedUser }) => {
  const [
    getUserActivities,
    { data: { userActivities } = {}, fetchMore, loading },
  ] = useLazyQuery(USER_ACTIVITIES, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (user) {
      getUserActivities({ variables: { userId: user.id, quantity: 30 } });
    }
  }, [user]);

  const isSignedUseruser = () =>
    signedUser && user && signedUser.id === user.id;

  const joinedDate = () => {
    const parsedDate = new Date(parseInt(user.createdAt));
    const dateOptions = { month: 'long', year: 'numeric' };
    return parsedDate.toLocaleDateString('en-US', dateOptions);
  };

  const {
    id,
    nickname,
    userDetails: { interests, about, profileImage, backgroundImage },
  } = user;

  return (
    <div className="profile">
      <header>
        <ProfileAvatarBackground
          profileImage={profileImage}
          backgroundImage={backgroundImage}
        />
        <div className="header-details">
          <p className="attribution">Data provided by Marvel. © 2021 Marvel</p>
          {isSignedUseruser() && <EditProfileActivator profileUser={user} />}
          <h2>{nickname}</h2>
          <p className="joined">
            <DateRange /> <span>Joined {joinedDate()}</span>
          </p>
          <ProfilePageDetailsStatistics userId={id} />
          <Link
            to={`/profile/${user.nickname}/library`}
            className="library-link"
          >
            <b>{nickname}'s</b> Library
          </Link>
          <ProfileDetailsAbout interests={interests} about={about} />
        </div>
      </header>
      <div className="profile-content">
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}

        {userActivities && (
          <UserActivitiesList
            userActivities={userActivities}
            fetchMore={fetchMore}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Profile);
