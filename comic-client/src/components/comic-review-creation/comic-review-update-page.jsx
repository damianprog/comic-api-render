import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams, withRouter } from 'react-router';
import ComicReviewCreation from './comic-review-creation';
import { REVIEW } from '../../graphql/graphql';

import './comic-review-creation-page.scss';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

const ComicReviewUpdatePage = ({ signedUser, history }) => {
  const { reviewId } = useParams();

  const isSignedUserReviewAuthor = (userReview) =>
    userReview.user.id === signedUser.id;

  const { data: { review } = {}, loading } = useQuery(REVIEW, {
    fetchPolicy: 'no-cache',
    variables: {
      id: reviewId,
    },
    onCompleted({ review }) {
      if (!isSignedUserReviewAuthor(review)) {
        history.push(`/comic/${review.comic.id}/reviews/create`);
      }
    },
  });

  return (
    <div className="comic-review-creation-page">
      <div className="wrapper">
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}

        {review && isSignedUserReviewAuthor(review) && (
          <ComicReviewCreation update review={review} comic={review.comic} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(withRouter(ComicReviewUpdatePage));
