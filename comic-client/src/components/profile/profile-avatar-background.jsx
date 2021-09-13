import React, { useState, useEffect } from 'react';
import { Close } from '@material-ui/icons';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import './profile-avatar-background.scss';
import backgroundPlaceholder from '../../assets/placeholders/background-placeholder.png';
import profilePlaceholder from '../../assets/placeholders/profile-placeholder.png';

const ProfileAvatarBackground = ({
  onChange,
  profileImage,
  backgroundImage,
  showControlIcons = false,
}) => {
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(
    backgroundImage
  );
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  useEffect(() => {
    setCurrentBackgroundImage(backgroundImage);
    setCurrentProfileImage(profileImage);
  }, [profileImage, backgroundImage]);

  const onImageInputChange = (event) => {
    const file = event.target.files[0];
    const inputName = event.target.name;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        inputName === 'backgroundImage'
          ? setCurrentBackgroundImage(reader.result)
          : setCurrentProfileImage(reader.result);
        onChange({ [event.target.name]: reader.result });
        event.target.value = '';
      };
    }
  };

  const deleteBackgroundImage = () => {
    setCurrentBackgroundImage('');
    onChange({ backgroundImage: '' });
  };

  return (
    <div className="profile-avatar-background">
      <div
        style={{
          backgroundImage: `${
            showControlIcons
              ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'
              : ''
          }
          url('${
            currentBackgroundImage
              ? currentBackgroundImage
              : backgroundPlaceholder
          }')`,
        }}
        className="background-image"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <label>
              <AddAPhotoOutlinedIcon />
              <input
                className="image-input"
                type="file"
                name="backgroundImage"
                onChange={onImageInputChange}
              />
            </label>

            {currentBackgroundImage ? (
              <label className="delete-bg" onClick={deleteBackgroundImage}>
                <Close />
              </label>
            ) : null}
          </div>
        ) : null}
      </div>
      <div
        alt="profile picture"
        style={{
          backgroundImage: `${
            showControlIcons
              ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'
              : ''
          }
          url('${
            currentProfileImage ? currentProfileImage : profilePlaceholder
          }')`,
        }}
        className="avatar"
      >
        {showControlIcons ? (
          <div className="control-icons">
            <label>
              <AddAPhotoOutlinedIcon />
              <input
                className="image-input"
                type="file"
                name="profileImage"
                onChange={onImageInputChange}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileAvatarBackground;
