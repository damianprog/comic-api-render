import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import ComicReviewCommentsForm from './comic-review-comments-form';
import './comic-review-comments.scss';

const ComicReviewComments = ({ signedUser, review }) => {
  const {
    data: { comments } = {},
    refetch,
    loading,
  } = useQuery(COMMENTS, {
    variables: {
      reviewId: review.id,
    },
  });

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, []);

  return (
    <div className="comic-review-comments">
      <h2>Comments</h2>
      <ComicReviewCommentsForm review={review} />
    </div>
  );
};

const COMMENTS = gql`
  query comments($reviewId: ID) {
    comments(reviewId: $reviewId) {
      id
      text
    }
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicReviewComments);
