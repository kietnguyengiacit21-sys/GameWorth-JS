import React from 'react';

import ScreenPlaceholder from '../../components/ScreenPlaceholder';

function EditProfileScreen() {
  return (
    <ScreenPlaceholder
      title="Edit Profile"
      owner="OWNER A — AUTH / PROFILE"
      description="Edit the current user profile through PUT /api/users/me."
    />
  );
}

export default EditProfileScreen;
