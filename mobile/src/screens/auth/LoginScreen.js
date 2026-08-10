import React from 'react';

import ScreenPlaceholder from '../../components/ScreenPlaceholder';

function LoginScreen() {
  return (
    <ScreenPlaceholder
      title="Login"
      owner="OWNER A — AUTH / PROFILE"
      description="Email/password login using authSlice and POST /api/auth/login."
    />
  );
}

export default LoginScreen;
