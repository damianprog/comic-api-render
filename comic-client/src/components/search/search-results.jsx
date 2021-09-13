import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import SearchResultsList from './search-results-list';
import Pagination from '@material-ui/lab/Pagination';

import './search-results.scss';

const SearchResults = ({ comics, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(10);

  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = comics.slice(indexOfFirstComic, indexOfLastComic);

  const paginate = (_, pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search-results wrapper">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <div className="list-pagination">
          <SearchResultsList
            comics={currentComics}
            allComicsLength={comics.length}
          ></SearchResultsList>
          {comics.length > 0 && (
            <Pagination
              className="pagination"
              count={Math.ceil(comics.length / 10)}
              shape="rounded"
              onChange={paginate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
