import { useQuery } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { REVIEW } from '../../graphql/graphql';
import ComicReview from './comic-review';

import './comic-review-page.scss';

const ComicReviewPage = () => {
  const { reviewId } = useParams();

  const { data: { review } = {}, loading } = useQuery(REVIEW, {
    variables: {
      id: reviewId,
    },
  });

  return (
    <div className="comic-review-page">
      <div className="wrapper">
        {loading && (
          <div className="loading">
            <CircularProgress />
          </div>
        )}

        {review && <ComicReview review={review} />}
      </div>
    </div>
  );
};

export default ComicReviewPage;
