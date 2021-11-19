import React from 'react';
import ComicTeaser from '../comic-teaser/comic-teaser';
import ComicReviewHeader from './comic-review-header';
import ComicReviewComments from './comments/comic-review-comments';

import './comic-review.scss';

const ComicReview = ({ review }) => {
  return (
    <div className="comic-review">
      <div className="wrapper">
        <div className="content">
          <ComicReviewHeader review={review} />
          <ComicTeaser comic={review.comic} />
          <p className="review-text">{review.text}</p>
          <ComicReviewComments review={review} />
        </div>
      </div>
    </div>
  );
};

export default ComicReview;
