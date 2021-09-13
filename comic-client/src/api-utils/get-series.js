import MarvelApiBase from '../marvel-api-base/marvel-api-base';
import { isCachedDataValid } from './utils';

const GetSeries = async (id) => {
  const url = `https://gateway.marvel.com/v1/public/series?id=${id}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`;
  const cachedData = JSON.parse(window.localStorage.getItem(url));
  if (isCachedDataValid(cachedData)) {
    return cachedData.result;
  } else {
    try {
      const fetchSeriesResponse = await MarvelApiBase.get('v1/public/series', {
        params: {
          id: id,
          apikey: process.env.REACT_APP_MARVEL_API_KEY,
        },
      });

      const fetchedSeries = fetchSeriesResponse.data.data.results[0];

      const newCachedData = {
        result: fetchedSeries,
        expirationDate: Date.now() + 3600 * 24 * 1000,
      };

      window.localStorage.setItem(url, JSON.stringify(newCachedData));

      return fetchedSeries;
    } catch (error) {
      console.log(error);
    }
  }
};

export default GetSeries;
