import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import restructureApiComic from './restructure-api-comic';
import { isCachedDataValid } from './utils';

const GetComicsFromSeries = async (seriesId) => {
  const url = `https://gateway.marvel.com/v1/public/series/${seriesId}/comics?noVariants=true&orderBy=issueNumber&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedData = JSON.parse(window.localStorage.getItem(url));
  if (isCachedDataValid(cachedData)) {
    return cachedData.result;
  } else {
    try {
      const fetchComicsResponse = await MarvelApiBase.get(
        `v1/public/series/${seriesId}/comics`,
        {
          params: {
            noVariants: true,
            orderBy: 'issueNumber',
            apikey: process.env.REACT_APP_MARVEL_API_KEY,
          },
        }
      );

      const fetchedComics = fetchComicsResponse.data.data.results;
      const fetchedComicsWithImages = fetchedComics.filter(
        (comic) => comic.images.length > 0
      );

      const restructuredComics = fetchedComicsWithImages.map((comic) =>
        restructureApiComic(comic)
      );

      const newCachedData = {
        result: restructuredComics,
        expirationDate: Date.now() + 3600 * 24 * 1000,
      };

      window.localStorage.setItem(url, JSON.stringify(newCachedData));
      return restructuredComics;
    } catch (error) {
      console.log(error);
    }
  }
};

export default GetComicsFromSeries;
