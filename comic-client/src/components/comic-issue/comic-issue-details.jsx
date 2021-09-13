import React, { useState } from 'react';
import SaveComicDialog from '../save-comic/save-comic-dialog';

import './comic-issue-details.scss';
import { connect } from 'react-redux';
import ComicIssueDetailsInfo from './comic-issue-details-info';
import ComicIssueDetailsImage from './comic-issue-details-image';

const ComicIssueDetails = ({ comic }) => {
  const [openSaveComicDialog, setOpenSaveComicDialog] = useState(false);

  const toggleSaveDialog = () => {
    setOpenSaveComicDialog(!openSaveComicDialog);
  };

  const { coverImage } = comic;

  return (
    <div className="comic-issue-details">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="comic-issue-details-bg"
      ></div>
      <div className="wrapper">
        <ComicIssueDetailsImage
          image={coverImage}
          onClickSaveComic={toggleSaveDialog}
        />
        <ComicIssueDetailsInfo comic={comic} />
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

export default connect(mapStateToProps)(ComicIssueDetails);
