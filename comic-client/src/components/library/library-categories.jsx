import React from 'react';
import './library-categories.scss';
import { List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const LibraryCategories = ({ categories, onSelectCategory }) => {
  const sortedCategories = () => {
    return [...categories].sort();
  };

  return (
    <div className="library-categories">
      <div className="categories-list">
        <h3 className="header">Categories</h3>
        <List className="list">
          {sortedCategories().map((category) => (
            <ListItem
              onClick={() => onSelectCategory(category)}
              key={category}
              button
            >
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="categories-autocomplete">
        <Autocomplete
          options={sortedCategories()}
          onChange={(_, value) => onSelectCategory(value)}
          renderInput={(params) => (
            <TextField {...params} label="Categories" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
};

export default LibraryCategories;
