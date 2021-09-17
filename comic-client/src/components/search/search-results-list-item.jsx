import React from 'react';
import { Link } from 'react-router-dom';

import './search-results-list-item.scss';

const SearchResultsListItem = ({ comic, comic: { id, coverImage, title } }) => {
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
          <a className="linking" href={comic.linkingUrl}>
            <b>See at Marvel store</b>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsListItem;
