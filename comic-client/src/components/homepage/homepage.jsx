import React, { useState } from 'react';
import ComicsPreview from '../comics-preview/comics-preview';
import GetComicsByTitle from '../../api-utils/get-comics-by-title';

import './homepage.scss';
import { useEffect } from 'react';

const Homepage = () => {
  const [firstPreviewComics, setFirstPreviewComics] = useState([]);
  const [secondPreviewComics, setSecondPreviewComics] = useState([]);
  const [thirdPreviewComics, setThirdPreviewComics] = useState([]);

  useEffect(() => {
    const setPreviews = async () => {
      let firstPreviewSet = await GetComicsByTitle('Iron Man', 10);
      let secondPreviewSet = await GetComicsByTitle('Black Widow', 10);
      let thirdPreviewSet = await GetComicsByTitle(
        'Guardians of the Galaxy',
        10
      );

      firstPreviewSet && setFirstPreviewComics(firstPreviewSet);
      secondPreviewSet && setSecondPreviewComics(secondPreviewSet);
      thirdPreviewSet && setThirdPreviewComics(thirdPreviewSet);
    };
    setPreviews();
  }, []);

  return (
    <div className="homepage">
      <ComicsPreview
        comics={firstPreviewComics}
        title="New Iron Man releases"
      />
      <ComicsPreview
        comics={secondPreviewComics}
        title="New Black Widow releases"
      />
      <ComicsPreview
        comics={thirdPreviewComics}
        title="New Guardians of the Galaxy releases"
      />
    </div>
  );
};

export default Homepage;
