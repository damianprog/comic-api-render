import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import LibraryCategories from './library-categories';
import LibraryCategory from './library-category';
import './library-content.scss';

const LibraryContent = ({ userComics }) => {
  const { nickname } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const getUniqueCategories = () => {
    const userComicsCategories = userComics.map(
      (userComic) => userComic.category
    );
    const uniqueCategories = [...new Set(userComicsCategories)];
    return uniqueCategories;
  };

  useEffect(() => {
    if (userComics && categories.length === 0) {
      const uniqueCategories = getUniqueCategories();

      uniqueCategories.sort();
      setSelectedCategory(uniqueCategories[0]);

      setCategories(uniqueCategories);
    }
  }, [userComics]);

  return (
    <div className="library-content">
      <div className="library-list">
        <h3 className="library-header">{nickname}'s Library</h3>
        <LibraryCategories
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      <LibraryCategory category={selectedCategory} userComics={userComics} />
    </div>
  );
};

export default LibraryContent;
