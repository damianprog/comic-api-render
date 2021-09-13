import './profile-details-about.scss';

const ProfileDetailsAbout = ({ interests, about }) => {
  return (
    <div className="profile-details-about">
      <p>
        <b>Interests: </b>
        {interests}
      </p>
      <p>
        <b>About Me: </b>
        {about}
      </p>
    </div>
  );
};

export default ProfileDetailsAbout;
