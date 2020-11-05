import React, { PropsWithChildren } from 'react';

import { Sidebar } from '@orochizu-workspace/ui/components';
import { Box, Container, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 60,
    },
  },
}));

function Layout(props: PropsWithChildren<unknown>): JSX.Element {
  const { children } = props;

  const styles = useStyles();

  return (
    <Box display="flex">
      <Sidebar
        paths={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: 'About me', path: '/about' },
        ]}
      />
      <Container className={styles.root}>{children}</Container>
    </Box>
  );
}

export default Layout;
