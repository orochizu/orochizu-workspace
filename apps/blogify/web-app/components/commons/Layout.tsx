import React, { PropsWithChildren } from 'react';

import { Sidebar } from '@orochizu-workspace/ui/components';
import { Box, Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import SignInFormModal from '../modals/SignInFormModal';
import { isSignInModalOpen } from '../../graphql/client/cache';
import { useAuth } from '@orochizu-workspace/data-access/firebase/auth';

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

  const { user, handleSignOut } = useAuth();

  return (
    <Box display="flex">
      <Sidebar
        user={user}
        paths={[
          { name: 'Home', path: '/home' },
          { name: 'Blog', path: '/blog' },
          { name: 'About me', path: '/about' },
        ]}
        onSignIn={(): void => {
          isSignInModalOpen(true);
        }}
        onSingOut={handleSignOut}
      />
      <Container className={styles.root}>{children}</Container>
      <SignInFormModal />
    </Box>
  );
}

export default Layout;
