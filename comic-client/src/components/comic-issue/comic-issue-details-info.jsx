import React from 'react';
import './comic-issue-details-info.scss';

const ComicIssueDetailsInfo = ({ comic }) => {
  const publishedDate = () => {
    const { onsaleDate } = comic;
    let formattedDate = '';
    if (onsaleDate) {
      const parsedDate = new Date(Date.parse(onsaleDate));
      const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
      formattedDate = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return formattedDate;
  };

  const { title, writer, inker, penciler, description } = comic;

  const published = publishedDate();

  return (
    <div className="comic-issue-details-info">
      <h2>{title}</h2>
      <h3>Published:</h3>
      <span>{published}</span>
      <div className="info-row">
        {writer !== '' ? (
          <div>
            <h3>Writer:</h3>
            <span>{writer}</span>
          </div>
        ) : null}
        {inker !== '' ? (
          <div>
            <h3>Penciler:</h3>
            <span>{inker}</span>
          </div>
        ) : null}
      </div>
      {penciler !== '' ? (
        <div>
          <h3>Cover Artist:</h3>
          <span>{penciler}</span>
        </div>
      ) : null}

      <a href={comic.linkingUrl}>
        <b>See at Marvel store</b>
      </a>

      <div className="info-description">{description}</div>
    </div>
  );
};

export default ComicIssueDetailsInfo;
