import { Button } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './edit-profile-activator.scss';
import EditProfileDialog from './edit-profile-dialog';

const EditProfileActivator = ({ profileUser }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const history = useHistory();

  const toggleEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };

  const showEditProfile = () => {
    window.innerWidth > 600
      ? toggleEditDialog()
      : history.push('/edit-profile');
  };

  return (
    <div className="edit-profile-activator">
      <Button onClick={showEditProfile} variant="outlined">
        Edit Profile
      </Button>

      <EditProfileDialog
        open={openEditDialog}
        closeDialog={toggleEditDialog}
        profileUser={profileUser}
      ></EditProfileDialog>
    </div>
  );
};

export default EditProfileActivator;
