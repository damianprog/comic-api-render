import React from 'react';
import { Link } from 'react-router-dom';

import './search-results-list-item.scss';

const SearchResultsListItem = ({
  comic,
  comic: { id, coverImage, title, onsaleDate },
}) => {
  const publishedYear = () => {
    let year = '';
    if (onsaleDate) {
      const parsedDate = new Date(Date.parse(onsaleDate));
      const dateOptions = { year: 'numeric' };
      year = parsedDate.toLocaleDateString('en-US', dateOptions);
    }

    return year;
  };

  return (
    <div className="search-item">
      <Link to={`/comic/${id}`}>
        <div
          style={{ backgroundImage: `url(${coverImage})` }}
          className="search-item-image"
        ></div>
      </Link>
      <div className="search-item-details-wrapper">
        <div className="search-item-details">
          <b className="item-type">Comic Issue</b>
          <Link to={`/comic/${id}`}>
            <h2>{title}</h2>
          </Link>
          <b>{publishedYear()}</b>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsListItem;
