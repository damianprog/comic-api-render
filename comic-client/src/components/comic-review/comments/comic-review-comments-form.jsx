import { useMutation, gql } from '@apollo/client';
import { Avatar, Button, Input, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import GetUserProfileImage from '../../../utils/get-user-profile-image';
import { setSnackbar } from '../../redux/snackbar/snackbar-actions';
import './comic-review-comments-creation.scss';

const ComicReviewCommentsForm = ({ signedUser, review }) => {
  const [showFormActions, setShowFormActions] = useState(false);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();

  const [createComment, { createLoading }] = useMutation(CREATE_COMMENT, {
    update() {
      dispatch(setSnackbar(true, 'success', 'Comment has been posted'));
      setCommentText('');
      setShowFormActions(false);
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      reviewId: review.id,
      text: commentText,
    },
  });

  const onInputChange = (event) => {
    setCommentText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    createComment();
  };

  return (
    <div className="comic-review-comments-creation">
      <Link to={`/profile/${signedUser.nickname}`}>
        <Avatar
          className="avatar"
          alt="Signed User Image"
          src={GetUserProfileImage(signedUser)}
        />
      </Link>
      <form className="creation-form" onSubmit={onSubmit}>
        <Input
          value={commentText}
          className="form-input"
          placeholder="Post a comment"
          variant="standard"
          onFocus={() => setShowFormActions(true)}
          onInput={onInputChange}
          multiline
        />
        {showFormActions && (
          <div className="actions">
            <Button onClick={() => setShowFormActions(false)} variant="text">
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={createLoading}
            >
              {createLoading ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                <span>Comment</span>
              )}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

const CREATE_COMMENT = gql`
  mutation createComment($reviewId: ID, $text: String!) {
    createComment(reviewId: $reviewId, text: $text) {
      id
      text
    }
  }
`;

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicReviewCommentsForm);
