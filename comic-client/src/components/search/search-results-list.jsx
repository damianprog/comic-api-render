import React from 'react';

import './search-results-list.scss';
import SearchResultsListItem from './search-results-list-item';

const SearchResultsList = ({ comics, allComicsLength }) => {
  return (
    <div className="search-results-list">
      {comics.length > 0 && (
        <div className="results-qty-info">
          {allComicsLength} results in comics
        </div>
      )}
      {comics.map((comic) => (
        <SearchResultsListItem
          key={comic.id}
          comic={comic}
        ></SearchResultsListItem>
      ))}
    </div>
  );
};

export default SearchResultsList;
