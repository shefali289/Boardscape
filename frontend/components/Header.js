import React from 'react';
import { Button } from '@mui/material';
import { CREATE_EVENT } from 'graphql/mutation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { AuthContext } from 'context/auth';
import styles from '../styles/Header.module.css';

const Header = () => {
  const { user, logout } = React.useContext(AuthContext);
  const values = { title: 'orgy', description: 'orgy' };

  const [createEvent] = useMutation(CREATE_EVENT, {
    variables: values,
    onError(err) {
      console.log(JSON.stringify(err));
    },
  });
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a href="/">Boardscape</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/users">
              <a href="/users">Users</a>
            </Link>
          </li>
          <li>
            <Button onClick={() => createEvent()}> create event </Button>
          </li>
          <li>
            {!user ? (
              <Link href="/login">
                <a href="/login">login</a>
              </Link>
            ) : (<Button onClick={() => logout()}>Logout</Button>) }
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
