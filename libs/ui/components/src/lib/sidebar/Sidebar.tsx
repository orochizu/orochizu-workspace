import React, { useCallback, useState } from 'react';

import {
  AppBar,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Menu from '@material-ui/icons/Menu';

import { NavigationLink } from '@orochizu-workspace/types';

import Logo from './Logo';
import SidebarButton from './SidebarButton';
import SidebarFooter from './SidebarFooter';
import firebase from 'firebase';

const useStyles = makeStyles(() => ({
  menu: {
    height: '100%',
  },
}));

interface Props {
  paths: NavigationLink[];
  user: firebase.User;
  onSignIn: () => void;
  onSingOut: () => void;
}

export function Sidebar(props: Props): JSX.Element {
  const { paths, user, onSignIn, onSingOut } = props;
  const styles = useStyles();

  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = useCallback(
    (): void => setMenuOpen((prev) => !prev),
    []
  );

  return (
    <>
      <Hidden smDown>
        <Drawer variant="permanent">
          <Grid container justify="space-evenly" className={styles.menu}>
            <Grid item container>
              <Logo />
            </Grid>
            <Grid item container justify="center" direction="column">
              {paths.map(({ path, name }) => (
                <SidebarButton key={name} href={path}>
                  {name}
                </SidebarButton>
              ))}
            </Grid>
            <Grid container item>
              <SidebarFooter
                user={user}
                onSignIn={onSignIn}
                onSingOut={onSingOut}
              />
            </Grid>
          </Grid>
        </Drawer>
      </Hidden>
      <Hidden mdUp>
        <AppBar position="fixed">
          <Toolbar color="inherit">
            <IconButton onClick={handleMenuToggle}>
              <Menu color="secondary" />
            </IconButton>
            <Logo />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={isMenuOpen}
          onClose={handleMenuToggle}
        >
          <Grid container justify="space-evenly" className={styles.menu}>
            <Grid item container justify="center" direction="column">
              {paths.map(({ path, name }) => (
                <SidebarButton
                  key={name}
                  href={path}
                  onClick={handleMenuToggle}
                >
                  {name}
                </SidebarButton>
              ))}
            </Grid>
            <Grid container item>
              <SidebarFooter
                user={user}
                onSignIn={onSignIn}
                onSingOut={onSingOut}
              />
            </Grid>
          </Grid>
        </Drawer>
      </Hidden>
    </>
  );
}
