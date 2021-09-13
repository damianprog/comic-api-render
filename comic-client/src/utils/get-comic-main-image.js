const GetComicMainImage = (comic) => {
  const { images } = comic;
  return images && images[0] ? `${images[0].path}.${images[0].extension}` : '';
};

export default GetComicMainImage;
