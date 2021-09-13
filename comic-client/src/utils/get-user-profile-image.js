import profilePlaceholder from '../assets/placeholders/profile-placeholder.png';

const GetUserProfileImage = (user) => {
  const {
    userDetails: { profileImage },
  } = user;

  return profileImage ? profileImage : profilePlaceholder;
};

export default GetUserProfileImage;
