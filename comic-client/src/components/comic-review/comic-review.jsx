import React from 'react';
import ComicTeaser from '../comic-teaser/comic-teaser';
import ComicReviewHeader from './comic-review-header';

import './comic-review.scss';

const ComicReview = ({ review }) => {
  return (
    <div className="comic-review">
      <div className="wrapper">
        <ComicReviewHeader review={review} />
        <ComicTeaser comic={review.comic} />
        <p className="review-text">{review.text}</p>
      </div>
    </div>
  );
};

export default ComicReview;
