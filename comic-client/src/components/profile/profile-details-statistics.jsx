import { useQuery } from '@apollo/client';
import { Fragment } from 'react';
import { REVIEWS, USER_COMICS } from '../../graphql/graphql';
import './profile-details-statistics.scss';

const ProfileDetailsStatistics = ({ userId }) => {
  const { data: { reviews } = {} } = useQuery(REVIEWS, {
    variables: {
      userId,
    },
  });

  const { data: { userComics } = {} } = useQuery(USER_COMICS, {
    variables: {
      userId,
    },
  });

  return (
    <div className="profile-details-statistics">
      {reviews && userComics && (
        <Fragment>
          <span>
            <b>{reviews.length}</b> Reviews
          </span>
          <span>
            <b>{userComics.length}</b> Library Comics
          </span>
        </Fragment>
      )}
    </div>
  );
};

export default ProfileDetailsStatistics;
