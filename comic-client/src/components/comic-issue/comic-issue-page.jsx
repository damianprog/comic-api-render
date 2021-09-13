import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetComic from '../../api-utils/get-comic';
import SetDescriptionInComic from '../../api-utils/set-description-in-comic';
import ComicIssue from './comic-issue';

import './comic-issue-page.scss';

const ComicIssuePage = () => {
  const [comic, setComic] = useState();
  const { comicId } = useParams();

  useEffect(() => {
    const fetchComic = async () => {
      let fetchedComic = await GetComic(comicId);
      if (fetchedComic) {
        fetchedComic = await SetDescriptionInComic(fetchedComic);
        setComic(fetchedComic);
      }
    };

    fetchComic();
  }, [comicId]);

  return (
    <div className="comic-issue-page">
      {comic && <ComicIssue comic={comic} />}
    </div>
  );
};

export default ComicIssuePage;
