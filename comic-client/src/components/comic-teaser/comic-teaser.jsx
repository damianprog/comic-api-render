import { Button } from '@material-ui/core';
import { LibraryAdd } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SaveComicDialog from '../save-comic/save-comic-dialog';
import './comic-teaser.scss';

const ComicTeaser = ({ comic, showDescription, signedUser }) => {
  const [openSaveComicDialog, setOpenSaveComicDialog] = useState(false);

  const toggleSaveDialog = () => {
    setOpenSaveComicDialog(!openSaveComicDialog);
  };

  const { coverImage, title, id, description } = comic;

  const descriptionText = () => {
    return description.substring(0, 175);
  };

  return (
    <div className="comic-teaser">
      <Link to={`/comic/${id}`}>
        <div className="img-container">
          <img alt="cover" src={coverImage} />
        </div>
      </Link>

      <div className="info">
        <Link to={`/comic/${id}`}>
          <h3>{title}</h3>
        </Link>
        <a className="linking-url" href={comic.linkingUrl}>
          See at Marvel store
        </a>
        {signedUser && (
          <div className="save-dialog">
            <Button disableRipple onClick={toggleSaveDialog}>
              <LibraryAdd />
              Save Comic
            </Button>
          </div>
        )}
        {showDescription && (
          <div className="description">
            {descriptionText()}
            {description.length > 175 && (
              <span>
                ...&nbsp;<Link to={`/comic/${comic.id}`}>Continue reading</Link>
              </span>
            )}
          </div>
        )}
      </div>
      <SaveComicDialog
        open={openSaveComicDialog}
        closeDialog={toggleSaveDialog}
        comic={comic}
      ></SaveComicDialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(ComicTeaser);
