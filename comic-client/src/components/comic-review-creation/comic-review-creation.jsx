import React from 'react';
import ComicTeaser from '../comic-teaser/comic-teaser';
import ComicReviewCreationForm from './comic-review-creation-form';
import './comic-review-creation.scss';

const ComicReviewCreation = ({ comic, update, review }) => {
  return (
    <div className="comic-review-creation">
      <h2>{update ? 'Update' : 'Create'} Review</h2>
      <ComicTeaser comic={comic} />
      <ComicReviewCreationForm update={update} review={review} comic={comic} />
    </div>
  );
};

export default ComicReviewCreation;
