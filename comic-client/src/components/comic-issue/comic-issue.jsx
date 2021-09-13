import React from 'react';

import ComicIssueDetails from './comic-issue-details';
import ComicsPreview from '../comics-preview/comics-preview';

import GetComicsFromSeries from '../../api-utils/get-comics-from-series';

import ComicIssueReviews from './reviews/comic-issue-reviews';
import { useState } from 'react';
import { useEffect } from 'react';

const ComicIssue = ({ comic }) => {
  const [comicsFromSeries, setComicsFromSeries] = useState([]);

  useEffect(() => {
    const fetchComicsFromSeries = async () => {
      let fetchedComicsFromSeries = await GetComicsFromSeries(comic.seriesId);
      fetchedComicsFromSeries = fetchedComicsFromSeries
        ? fetchedComicsFromSeries
        : [];

      setComicsFromSeries(fetchedComicsFromSeries);
    };

    fetchComicsFromSeries();
  }, [comic]);

  return (
    <div className="comic-issue">
      <ComicIssueDetails comic={comic} />
      <ComicIssueReviews comic={comic} />
      <ComicsPreview
        comics={comicsFromSeries}
        title="More form this series"
      ></ComicsPreview>
    </div>
  );
};

export default ComicIssue;
