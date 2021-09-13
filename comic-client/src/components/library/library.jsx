import React from 'react';
import { useQuery } from '@apollo/client';
import { USER_COMICS } from '../../graphql/graphql';
import { connect } from 'react-redux';
import './library.scss';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import LibraryContent from './library-content';

const Library = () => {
  const { nickname } = useParams();

  const { data: { userComics } = {}, loading } = useQuery(USER_COMICS, {
    variables: {
      nickname,
    },
  });

  return (
    <div className="library">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : userComics.length > 0 ? (
        <LibraryContent userComics={userComics} />
      ) : (
        <h3 className="library-empty-info">
          {nickname}'s Library has no any saved comics yet!
        </h3>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(Library);
