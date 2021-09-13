import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GetComic from '../../api-utils/get-comic';
import SetDescriptionInComic from '../../api-utils/set-description-in-comic';
import ComicReviewCreation from './comic-review-creation';
import './comic-review-creation-page.scss';

const ComicReviewCreationPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState();

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
    <div className="comic-review-creation-page">
      <div className="wrapper">
        {comic && <ComicReviewCreation comic={comic} />}
      </div>
    </div>
  );
};

export default ComicReviewCreationPage;
