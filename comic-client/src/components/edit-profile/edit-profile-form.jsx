import React from 'react';
import DateSelector from '../date-selector/date-selector';

import './edit-profile-form.scss';

const EditProfileForm = ({ onChange, values, errors }) => {
  const onInputChange = (event) => {
    const keyValue = { [event.target.name]: event.target.value };
    onChange(keyValue);
  };

  const onBirthDateChange = (date) => {
    const keyValue = { birthDate: date.toString() };
    onChange(keyValue);
  };

  const { nickname, birthDate, about, interests } = values;

  return (
    <form className="edit-profile-form">
      {errors.nickname && <p>{errors.nickname}</p>}
      <input
        value={nickname}
        onInput={onInputChange}
        name="nickname"
        placeholder="Nickname"
        className={errors.nickname ? 'error' : ''}
        maxLength="20"
      ></input>
      {errors.interests && <p>{errors.interests}</p>}
      <input
        value={interests}
        onInput={onInputChange}
        name="interests"
        placeholder="Interests"
        className={errors.interests ? 'error' : ''}
        maxLength="150"
      ></input>
      {errors.about && <p>{errors.about}</p>}
      <textarea
        value={about}
        onInput={onInputChange}
        name="about"
        placeholder="About Me"
        className={`about ${errors.about ? 'error' : ''}`}
        maxLength="250"
      ></textarea>
      {errors.birthDate && <p>{errors.birthDate}</p>}
      <p className="outer-label">Birth Date</p>
      <DateSelector
        onChange={onBirthDateChange}
        defaultDate={new Date(parseInt(birthDate))}
        error={errors.birthDate}
      ></DateSelector>
    </form>
  );
};

export default EditProfileForm;
