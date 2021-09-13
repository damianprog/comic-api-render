import React from 'react';
import './library-category.scss';
import ComicsPreviewItem from '../comics-preview-item/comics-preview-item';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { deleteUserComicFromCache } from '../../graphql/utils';
import { useMutation } from '@apollo/client';
import { DELETE_USER_COMIC } from '../../graphql/graphql';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

const LibraryCategory = ({ category, userComics, signedUser }) => {
  const { nickname } = useParams();

  const [deleteUserComic] = useMutation(DELETE_USER_COMIC, {
    update(cache, { data: { deleteUserComic } }) {
      deleteUserComicFromCache(cache, deleteUserComic);
    },
    onError(err) {
      console.log(err);
    },
  });

  const userComicsFromCategory = () => {
    return userComics.filter((userComic) => userComic.category === category);
  };

  const sortedUserComicsFromCategory = () => {
    return userComicsFromCategory().sort(
      (a, b) => parseInt(b.createdAt) - parseInt(a.createdAt)
    );
  };

  const isSignedUserLibrary = signedUser && signedUser.nickname === nickname;

  return (
    <div className="library-category">
      <div className="library-category-content">
        <h3 className="header">{category}</h3>
        <div className="items">
          {sortedUserComicsFromCategory().map((userComic) => (
            <ComicsPreviewItem
              key={userComic.id}
              comic={userComic.comic}
              showControls={isSignedUserLibrary}
              disableAnimation
              controlDropdownContent={
                <Card className="dropdown-card">
                  <CardContent className="dropdown-card-content">
                    <List>
                      <ListItem
                        onClick={() =>
                          deleteUserComic({ variables: { id: userComic.id } })
                        }
                        button
                      >
                        <ListItemText primary="Delete" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(LibraryCategory);
