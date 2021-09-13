import StripHtmlTags from '../utils/strip-html-tags';
import GetSeries from './get-series';

const SetDescriptionInComic = async (comic) => {
  let description = comic.description;
  const isComicDescriptionEmpty = description.trim().length === 0;
  if (isComicDescriptionEmpty) {
    const series = await GetSeries(comic.seriesId);
    if (series) {
      description = series.description ? StripHtmlTags(series.description) : '';
    }
  }

  return { ...comic, description };
};

export default SetDescriptionInComic;
