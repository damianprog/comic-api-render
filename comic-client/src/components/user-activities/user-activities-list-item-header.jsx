import { Avatar } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import GetFormattedDate from '../../utils/get-formatted-date';
import GetUserProfileImage from '../../utils/get-user-profile-image';

import './user-activities-list-item-header.scss';
const UserActivitiesListItemHeader = ({ userActivity }) => {
  const { createdAt, user, category, comic } = userActivity;

  const publishedDate = () => {
    let formattedDate = '';
    if (createdAt) {
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = GetFormattedDate(+createdAt, dateOptions);
    }

    return formattedDate;
  };

  return (
    <div className="user-activities-list-item-header">
      <Link to={`/profile/${user.nickname}`}>
        <Avatar
          className="avatar"
          alt="User Activity User Image"
          src={GetUserProfileImage(user)}
        />
      </Link>
      <div className="item-header-details">
        <p>
          <Link to={`/profile/${user.nickname}`}>{user.nickname}</Link>&nbsp;
          {userActivity.__typename === 'UserComic' ? (
            <span>saved to {category}</span>
          ) : (
            <span>reviewed {comic.title}</span>
          )}
        </p>
        <span className="date">{publishedDate()}</span>
      </div>
    </div>
  );
};

export default UserActivitiesListItemHeader;
