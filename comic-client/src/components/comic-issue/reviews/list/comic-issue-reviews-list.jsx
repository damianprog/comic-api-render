import React from 'react';
import ComicIssueReviewsListItem from './comic-issue-reviews-list-item';
import './comic-issue-reviews-list.scss';

const ComicIssueReviewsList = ({ reviews }) => {
  const sortedReviews = () => {
    return reviews.sort(
      (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
    );
  };

  return (
    <div className="comic-issue-reviews-list">
      {reviews.length > 0 ? (
        sortedReviews().map((review, index) => (
          <ComicIssueReviewsListItem
            key={`${review.id}-${index}`}
            review={review}
          />
        ))
      ) : (
        <p className="empty-info">There are no reviews of this comic yet!</p>
      )}
    </div>
  );
};

export default ComicIssueReviewsList;
