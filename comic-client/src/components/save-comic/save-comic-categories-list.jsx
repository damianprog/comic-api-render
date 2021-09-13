import React from 'react';
import './save-comic-categories-list.scss';
import { useQuery } from '@apollo/client';
import { List } from '@material-ui/core';
import { connect } from 'react-redux';
import { USER_COMICS, USER_COMICS_CATEGORIES } from '../../graphql/graphql';
import SaveComicCategoriesListItem from './save-comic-categories-list-item';

const SaveComicCategoriesList = ({ comic, signedUser }) => {
  const { data: { userComics } = {} } = useQuery(USER_COMICS, {
    variables: {
      userId: signedUser.id,
      comicId: comic.id,
    },
  });

  const { data: { userComicsCategories } = {} } = useQuery(
    USER_COMICS_CATEGORIES,
    {
      variables: {
        userId: signedUser.id,
      },
    }
  );

  const categoriesWithDefault = () => {
    const categories = userComicsCategories
      ? ['Favourites', ...userComicsCategories]
      : [];

    const uniqueCategories = [...new Set(categories)];

    return uniqueCategories;
  };

  const sortedUserComicsCategories = () => {
    const sortedArray = categoriesWithDefault().sort();

    return sortedArray;
  };

  return (
    <div className="save-comic">
      <List className="categories-list">
        {sortedUserComicsCategories().map((category) => (
          <SaveComicCategoriesListItem
            key={category}
            category={category}
            comic={comic}
            userComics={userComics}
          />
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(SaveComicCategoriesList);
