import React, { createContext, useState, useEffect } from 'react';
import cookieCutter from 'cookie-cutter';
import { useGoogleLogout } from 'react-google-login';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,

      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export function userId() {
  // useState React hook
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(cookieCutter.get('user'));
  }, []);
  if (data) {
    return data;
  }
  return '';
}

const AuthProvider = (props) => {
  const clientId = '258995351528-ju3514u81v3i4lrp8rnnieful3il5hvh.apps.googleusercontent.com';

  const onLogoutSuccess = (res) => {
    console.log('Logged out Success', res);
    cookieCutter.set('token', '', { expires: new Date(0) });
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const [state, dispatch] = React.useReducer(authReducer, {
    user: userId(),
  });

  const login = (data) => {
    cookieCutter.set('token', data.token);
    cookieCutter.set('user', data.id);
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logout = () => {
    cookieCutter.set('token', { expires: new Date(0) });
    cookieCutter.set('user', { expires: new Date(0) });
    signOut();
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
        ...userId(),
      }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
