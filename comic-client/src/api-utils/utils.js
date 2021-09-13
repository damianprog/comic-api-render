export const isCachedDataValid = (cachedData) =>
  cachedData && parseInt(cachedData.expirationDate) > Date.now();
