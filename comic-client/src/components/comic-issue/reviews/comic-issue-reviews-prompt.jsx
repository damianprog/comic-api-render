import { Avatar, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import profilePlaceholder from '../../../assets/placeholders/profile-placeholder.png';
import './comic-issue-reviews-prompt.scss';

const ComicIssueReviewsPrompt = ({ signedUser, reviews }) => {
  const { comicId } = useParams();

  const profileImage = () => {
    const {
      userDetails: { profileImage },
    } = signedUser;

    return profileImage ? profileImage : profilePlaceholder;
  };

  const userReview = reviews.find(
    (review) => review.user.id === signedUser.id && review.comic.id === comicId
  );

  return (
    <div className="comic-issue-reviews-prompt">
      <Link to={`/profile/${signedUser.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={profileImage()}
        />
      </Link>
      <div className="info">
        <Link to={`/profile/${signedUser.nickname}`}>
          {signedUser.nickname}
        </Link>
        {userReview ? (
          <Link to={`/reviews/${userReview.id}`}>
            <Button variant="outlined" color="primary">
              See your review
            </Button>
          </Link>
        ) : (
          <Link to={`/comic/${comicId}/reviews/create`}>
            <Button variant="outlined" color="primary">
              Write a review
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicIssueReviewsPrompt);
