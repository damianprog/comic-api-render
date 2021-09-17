import StripHtmlTags from '../utils/strip-html-tags';

const getCoverImage = (comic) => {
  const { images } = comic;

  let coverImageUrl = '';

  if (images && images[0]) {
    const protocolUpdatedPath = images[0].path.replace('http://', 'https://');
    coverImageUrl = `${protocolUpdatedPath}.${images[0].extension}`;
  }

  return coverImageUrl;
};

const getOnsaleDate = (comic) => {
  const { dates } = comic;
  const onsaleDate = dates.find((date) => date.type === 'onsaleDate');
  return onsaleDate.date;
};

const getCreatorByRole = (comic, role) => {
  const { creators } = comic;
  let creatorName = '';
  if (creators) {
    const creator = creators.items.find((creator) =>
      creator.role.includes(role)
    );
    creatorName = creator ? creator.name : '';
  }

  return creatorName;
};

const getSeriesId = (comic) => {
  return comic.series ? comic.series.resourceURI.split('/').pop() : '';
};

const getComicDescription = (comic) => {
  return comic.description ? StripHtmlTags(comic.description) : '';
};

const getLinkingUrl = (comic) => {
  let linkingUrl = 'https://marvel.com';

  if (comic.urls && comic.urls.length > 0) {
    let urlObject = comic.urls.find((url) => url.type === 'purchase');

    linkingUrl = urlObject ? urlObject.url : comic.urls[0].url;

    linkingUrl = linkingUrl.replace('http://', 'https://');
  }

  return linkingUrl;
};

const restructureApiComic = (comic) => {
  const restructuredComic = {
    id: String(comic.id),
    title: comic.title,
  };

  restructuredComic.description = getComicDescription(comic);
  restructuredComic.coverImage = getCoverImage(comic);
  restructuredComic.onsaleDate = getOnsaleDate(comic);
  restructuredComic.writer = getCreatorByRole(comic, 'writer');
  restructuredComic.inker = getCreatorByRole(comic, 'inker');
  restructuredComic.penciler = getCreatorByRole(comic, 'penciler');
  restructuredComic.seriesId = getSeriesId(comic);
  restructuredComic.linkingUrl = getLinkingUrl(comic);

  return restructuredComic;
};

export default restructureApiComic;
