import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';

// refresh token
import { useTheme } from '@mui/material/styles';
import { Button, Box, useMediaQuery } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { GOOGLE_LOGIN } from 'graphql/mutation';
import { AuthContext } from '../../../context/auth';

import refreshTokenSetup from '../../../utils/refreshToken';

// MUI
import AnimateButton from '../../buttons/AnimateButton';

const clientId = '258995351528-ju3514u81v3i4lrp8rnnieful3il5hvh.apps.googleusercontent.com';

const LoginHooks = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  // ============================|| AUTH - LOGIN ||============================ //
  const [googleLogin] = useMutation(GOOGLE_LOGIN, {
    update(_, { data: { googleLogin: userData } }) {
      console.log(userData);
      context.login(userData);
    },
    onError(err) {
      console.log(JSON.stringify(err));
      console.log(err.graphQLErrors[0]);
      console.log(err.graphQLErrors[0].message);
    },
  });

  const onSuccess = async (res) => {
    console.log('Login Success: currentUser:', res.profileObj);

    const token = res.getAuthResponse().id_token;

    await googleLogin({ variables: { idToken: token } });
    refreshTokenSetup(res);
    router.push('/');
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (

    <div>
      <AnimateButton>
        <Button
          disableElevation
          fullWidth
          onClick={signIn}
          size="large"
          variant="outlined"
          sx={{
            color: 'grey.700',
            backgroundColor: theme.palette.grey[50],
            borderColor: theme.palette.grey[100],
          }}
        >
          <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
            <img src="../social-google.svg" alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
          </Box>
          Sign in with Google
        </Button>
      </AnimateButton>
    </div>
  );
};

export default LoginHooks;
