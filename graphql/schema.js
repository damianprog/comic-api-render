const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    nickname: String!
    email: String!
    birthDate: String!
    createdAt: String!
    userDetails: UserDetails
    token: String
  }

  input UserSearch {
    id: ID
    nickname: String
  }

  type UserDetails {
    id: ID!
    about: String
    interests: String
    profileImage: String
    backgroundImage: String
  }

  input UpdateUserInput {
    nickname: String
    birthDate: String
    about: String
    interests: String
    profileImageBase64: String
    backgroundImageBase64: String
  }

  input SignupInput {
    nickname: String!
    email: String!
    password: String!
    birthDate: String!
  }

  input NewComicInput {
    id: ID!
    title: String!
    coverImage: String
    onsaleDate: String
    writer: String
    inker: String
    penciler: String
    description: String
    seriesId: ID
    linkingUrl: String
  }

  type Comic {
    id: ID!
    title: String!
    coverImage: String
    onsaleDate: String
    writer: String
    inker: String
    penciler: String
    description: String
    seriesId: ID
    linkingUrl: String
  }

  type UserComic {
    id: ID!
    user: User!
    comic: Comic!
    category: String
    createdAt: String
  }

  type Review {
    id: ID!
    comic: Comic!
    user: User!
    text: String!
    createdAt: String
  }

  type Comment {
    id: ID!
    userComic: UserComic
    review: Review
    user: User!
    text: String!
}

  union UserActivity = UserComic | Review

  type Query {
    user(where: UserSearch!): User
    currentUser: User!
    comic(id: ID): Comic
    userComics(userId: ID, nickname: String, comicId: ID): [UserComic]
    userComicsCategories(userId: ID, nickname: String): [String]
    review(id: ID!): Review
    reviews(userId: ID, comicId: ID): [Review]
    userActivities(
      userId: ID
      quantity: Int
      lastActivityCreatedAt: String
    ): [UserActivity]
    comment(id: ID!): Comment
    comments(userComicId: ID, reviewId: ID): [Comment]
  }

  type Mutation {
    signup(signupInput: SignupInput): User!
    signin(email: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput!): User
    createComic(newComicInput: NewComicInput!): Comic!
    createUserComic(newComicInput: NewComicInput!, category: String!): UserComic
    deleteUserComic(id: ID): UserComic
    createReview(newComicInput: NewComicInput!, text: String!): Review
    updateReview(comicId: ID!, text: String!): Review
    deleteReview(id: ID): Review
    createComment(userComicId: ID, reviewId: ID, text: String!): Comment
    signout: Boolean
  }
`;

module.exports = typeDefs;
