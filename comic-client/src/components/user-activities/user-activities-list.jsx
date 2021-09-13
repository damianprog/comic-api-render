import React from 'react';
import { Fragment } from 'react';
import { Waypoint } from 'react-waypoint';
import UserActivitiesListItem from './user-activities-list-item';

import './user-activities-list.scss';
const UserActivitiesList = ({ userActivities, fetchMore }) => {
  const shouldRenderWaypoint = (lastRenderedActivityIndex) =>
    lastRenderedActivityIndex === userActivities.length - 11;

  const lastActivityCreatedAt = () =>
    userActivities[userActivities.length - 1].createdAt;

  const loadMoreActivities = () => {
    fetchMore({
      variables: {
        quantity: 30,
        lastActivityCreatedAt: lastActivityCreatedAt(),
      },
      updateQuery: (_, { fetchMoreResult }) => {
        return {
          userActivities: [
            ...userActivities,
            ...fetchMoreResult.userActivities,
          ],
        };
      },
    });
  };

  return (
    <div className="user-activities-list">
      {userActivities.map((userActivity, index) => (
        <Fragment key={userActivity.id + userActivity.__typename}>
          <UserActivitiesListItem userActivity={userActivity} />
          {shouldRenderWaypoint(index) && (
            <Waypoint onEnter={loadMoreActivities} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default UserActivitiesList;
