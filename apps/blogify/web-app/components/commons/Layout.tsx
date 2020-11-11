import React, { PropsWithChildren, useEffect, useState } from 'react';

import { Sidebar } from '@orochizu-workspace/ui/components';
import { Box, Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SignInFormModal from '../modals/SignInFormModal';
import { isSignInModalOpen } from '../../graphql/client/cache';
import { useFirebase } from '@orochizu-workspace/data-access/firebase/client';
import firebase from 'firebase';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    paddingTop: 60,
    paddingBottom: 60,
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
      paddingTop: 30,
      paddingBottom: 30,
    },
  },
}));

function Layout(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;

  const styles = useStyles();

  const { auth } = useFirebase();

  const [user, setUser] = useState<firebase.User | null>(auth().currentUser);

  useEffect(() => {
    return auth().onAuthStateChanged((user) => setUser(user));
  }, [auth]);

  return (
    <Box display="flex">
      <Sidebar
        user={user}
        paths={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: 'About me', path: '/about' },
        ]}
        onSignIn={(): void => {
          isSignInModalOpen(true);
        }}
        onSingOut={(): void => {
          localStorage.removeItem('token');
          auth().signOut();
        }}
      />
      <Container className={styles.root}>{children}</Container>
      <SignInFormModal />
    </Box>
  );
}

export default Layout;
