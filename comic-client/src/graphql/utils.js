import { USER_COMICS } from './graphql';

export const addUserComicToCache = (cache, userComic) => {
  const saveComicUserComics = cache.readQuery({
    query: USER_COMICS,
    variables: {
      comicId: userComic.comic.id,
      userId: userComic.user.id,
    },
  });

  const libraryUserComics = cache.readQuery({
    query: USER_COMICS,
    variables: {
      nickname: userComic.user.nickname,
    },
  });

  if (saveComicUserComics) {
    cache.writeQuery({
      query: USER_COMICS,
      variables: { comicId: userComic.comic.id, userId: userComic.user.id },
      data: { userComics: [...saveComicUserComics.userComics, userComic] },
    });
  }

  if (libraryUserComics) {
    cache.writeQuery({
      query: USER_COMICS,
      variables: { nickname: userComic.user.nickname },
      data: { userComics: [...libraryUserComics.userComics, userComic] },
    });
  }
};

export const deleteUserComicFromCache = (cache, userComic) => {
  cache.modify({
    fields: {
      userComics(cachedUserComicsRefs = [], { readField }) {
        const updatedUserComicsRefs = cachedUserComicsRefs.filter(
          (userComicRef) => userComic.id !== readField('id', userComicRef)
        );

        return updatedUserComicsRefs;
      },
    },
  });
};
