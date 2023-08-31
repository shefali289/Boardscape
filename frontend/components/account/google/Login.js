import React from 'react';

import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../../../utils/refreshToken';

// MUI
import AnimateButton from '../../buttons/AnimateButton';

const clientId = '258995351528-ju3514u81v3i4lrp8rnnieful3il5hvh.apps.googleusercontent.com';

const Login = () => {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in With Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        style={{ marginTop: '100px' }}
        isSignedIn
      />
      <AnimateButton>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in With Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
          style={{ marginTop: '100px' }}
          isSignedIn
        />
      </AnimateButton>
    </div>
  );
};

export default Login;
