const comicsResolvers = require('./comics');
const usersResolvers = require('./users');
const userComicsResolvers = require('./user-comics');
const reviewsResolvers = require('./reviews');
const userActivities = require('./user-activities');
const commentsResolvers = require('./comments');
const unions = require('./unions');

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...comicsResolvers.Query,
    ...userComicsResolvers.Query,
    ...reviewsResolvers.Query,
    ...userActivities.Query,
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...comicsResolvers.Mutation,
    ...userComicsResolvers.Mutation,
    ...reviewsResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
  ...unions,
};
