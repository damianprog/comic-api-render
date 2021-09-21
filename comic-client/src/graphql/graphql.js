import gql from 'graphql-tag';

export const SIGNOUT = gql`
  mutation signout {
    signout
  }
`;

export const USER = gql`
  query ($id: ID, $nickname: String) {
    user(where: { id: $id, nickname: $nickname }) {
      id
      nickname
      birthDate
      email
      createdAt
      userDetails {
        id
        about
        interests
        profileImage
        backgroundImage
      }
    }
  }
`;

export const CREATE_USER_COMIC = gql`
  mutation createUserComic(
    $id: ID!
    $title: String!
    $description: String
    $coverImage: String
    $onsaleDate: String
    $writer: String
    $inker: String
    $penciler: String
    $seriesId: ID
    $linkingUrl: String
    $category: String!
  ) {
    createUserComic(
      newComicInput: {
        id: $id
        title: $title
        description: $description
        coverImage: $coverImage
        onsaleDate: $onsaleDate
        writer: $writer
        inker: $inker
        penciler: $penciler
        seriesId: $seriesId
        linkingUrl: $linkingUrl
      }
      category: $category
    ) {
      id
      category
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
        linkingUrl
      }
      createdAt
    }
  }
`;

export const USER_COMICS = gql`
  query ($userId: ID, $nickname: String, $comicId: ID) {
    userComics(userId: $userId, nickname: $nickname, comicId: $comicId) {
      id
      category
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
        linkingUrl
      }
      createdAt
    }
  }
`;

export const DELETE_USER_COMIC = gql`
  mutation deleteUserComic($id: ID) {
    deleteUserComic(id: $id) {
      id
      user {
        id
        nickname
      }
      comic {
        id
      }
      category
    }
  }
`;

export const USER_COMICS_CATEGORIES = gql`
  query ($userId: ID, $nickname: String) {
    userComicsCategories(userId: $userId, nickname: $nickname)
  }
`;

export const REVIEW = gql`
  query ($id: ID!) {
    review(id: $id) {
      id
      user {
        id
        nickname
        userDetails {
          profileImage
        }
      }
      comic {
        id
        title
        coverImage
        description
        onsaleDate
        writer
        inker
        penciler
        linkingUrl
      }
      text
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $id: ID!
    $title: String!
    $description: String
    $coverImage: String
    $onsaleDate: String
    $writer: String
    $inker: String
    $penciler: String
    $seriesId: ID
    $linkingUrl: String
    $text: String!
  ) {
    createReview(
      newComicInput: {
        id: $id
        title: $title
        description: $description
        coverImage: $coverImage
        onsaleDate: $onsaleDate
        writer: $writer
        inker: $inker
        penciler: $penciler
        seriesId: $seriesId
        linkingUrl: $linkingUrl
      }
      text: $text
    ) {
      id
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
        linkingUrl
      }
      text
      createdAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation updateReview($comicId: ID!, $text: String!) {
    updateReview(comicId: $comicId, text: $text) {
      id
      user {
        id
        nickname
      }
      comic {
        id
        title
        coverImage
        writer
        inker
        penciler
        linkingUrl
      }
      text
      createdAt
    }
  }
`;

export const USER_ACTIVITIES = gql`
  query ($userId: ID!, $quantity: Int, $lastActivityCreatedAt: String) {
    userActivities(
      userId: $userId
      quantity: $quantity
      lastActivityCreatedAt: $lastActivityCreatedAt
    ) {
      ... on UserComic {
        id
        user {
          nickname
          userDetails {
            profileImage
          }
        }
        comic {
          id
          title
          description
          coverImage
          writer
          inker
          penciler
          linkingUrl
        }
        category
        createdAt
        __typename
      }
      ... on Review {
        id
        user {
          nickname
          userDetails {
            profileImage
          }
        }
        comic {
          id
          title
          description
          coverImage
          writer
          inker
          penciler
          linkingUrl
        }
        text
        createdAt
        __typename
      }
    }
  }
`;

export const REVIEWS = gql`
  query ($comicId: ID, $userId: ID) {
    reviews(comicId: $comicId, userId: $userId) {
      id
      user {
        id
        nickname
        userDetails {
          profileImage
        }
      }
      comic {
        id
      }
      text
      createdAt
    }
  }
`;
