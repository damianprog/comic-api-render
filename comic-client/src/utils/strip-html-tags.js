import he from 'he';

const StripHtmlTags = (string) => {
  const stripedHtml = string.replace(/(<([^>]+)>)/gi, '');
  const decodedStripedHtml = he.decode(stripedHtml);
  return decodedStripedHtml;
};

export default StripHtmlTags;
