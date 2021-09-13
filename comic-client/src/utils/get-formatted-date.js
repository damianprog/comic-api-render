const GetFormattedDate = (miliseconds, options) => {
  const parsedDate = new Date(miliseconds);
  const formattedDate = parsedDate.toLocaleDateString('en-US', options);
  return formattedDate;
};

export default GetFormattedDate;
