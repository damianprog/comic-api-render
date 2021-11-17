import React, { useState } from 'react';
import './save-comic-create-category.scss';
import { useMutation } from '@apollo/client';
import { CREATE_USER_COMIC } from '../../graphql/graphql';
import { Button, TextField } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { Add } from '@material-ui/icons';
import { addUserComicToCache } from '../../graphql/utils';
import { setSnackbar } from '../redux/snackbar/snackbar-actions';

const SaveComicCreateCategory = ({ comic, onCreate }) => {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const createCategory = (e) => {
    e.preventDefault();
    createUserComic({
      variables: {
        ...comic,
        category,
      },
    });
  };

  const onChangeCategory = (event) => {
    const categoryName = event.target.value;
    setCategory(categoryName);
    setErrors({ ...errors, category: null });
  };

  const [createUserComic] = useMutation(CREATE_USER_COMIC, {
    update(cache, { data: { createUserComic } }) {
      addUserComicToCache(cache, createUserComic);
      cache.modify({
        fields: {
          userComicsCategories(cachedCategories = []) {
            const updatedCachedCategories = [...cachedCategories];
            const isCategoryInCategories =
              cachedCategories.indexOf(createUserComic.category) !== -1;
            if (!isCategoryInCategories) {
              updatedCachedCategories.push(createUserComic.category);
            }

            return updatedCachedCategories;
          },
        },
      });

      dispatch(setSnackbar(true, 'success', 'Comic has been saved to library'));

      onCreate();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception);
    },
  });

  return (
    <div className="save-comic-create-category">
      {showForm ? (
        <form onSubmit={createCategory}>
          {errors.category && <p>{errors.category}</p>}
          <TextField
            focused
            placeholder="Enter category name..."
            onChange={onChangeCategory}
            name="category"
            className={errors.category ? 'error' : ''}
            inputProps={{ maxLength: 20 }}
            label="Name"
          />
          <Button type="submit" className="create-btn" disableRipple>
            Create
          </Button>
        </form>
      ) : (
        <Button onClick={toggleForm} className="create-btn" disableRipple>
          <Add />
          Create new category
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  signedUser: state.user.signedUser,
});

export default connect(mapStateToProps)(SaveComicCreateCategory);
