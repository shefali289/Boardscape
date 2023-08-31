import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '258995351528-ju3514u81v3i4lrp8rnnieful3il5hvh.apps.googleusercontent.com';

const Logout = () => {
  const onSuccess = () => {
    console.log('Logout made successfully');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
