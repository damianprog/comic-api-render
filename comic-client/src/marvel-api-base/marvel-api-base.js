import axios from 'axios';

const MarvelApiBase = axios.create({
  baseURL: `https://gateway.marvel.com/`,
});

export default MarvelApiBase;
