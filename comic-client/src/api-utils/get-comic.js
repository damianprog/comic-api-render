import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import restructureApiComic from './restructure-api-comic';
import { isCachedDataValid } from './utils';

const GetComic = async (id) => {
  const url = `https://gateway.marvel.com/v1/public/comics?id=${id}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedData = JSON.parse(window.localStorage.getItem(url));
  if (isCachedDataValid(cachedData)) {
    return cachedData.result;
  } else {
    try {
      const fetchComicResponse = await MarvelApiBase.get('v1/public/comics', {
        params: {
          id,
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      });

      const fetchedComic = fetchComicResponse.data.data.results[0];

      const restructuredComic = restructureApiComic(fetchedComic);

      const newCachedData = {
        result: restructuredComic,
        expirationDate: Date.now() + 3600 * 24 * 1000,
      };

      window.localStorage.setItem(url, JSON.stringify(newCachedData));

      return restructuredComic;
    } catch (error) {
      console.log('Fetching comic data failed... ', error);
    }
  }
};

export default GetComic;
