import React from 'react';

import { Drawer, Grid, Theme } from '@material-ui/core';

import { useWidth } from '@orochizu-workspace/utils/hooks';
import { makeStyles } from '@material-ui/styles';

import { Logo } from './Logo';
import { SidebarButton } from './SidebarButton';

const useStyles = makeStyles(() => ({
  menu: {
    height: '100%',
  },
}));

interface Props {}

export function Sidebar(props: Props) {
  const width = useWidth();
  const styles = useStyles();

  return (
    <>
      <Drawer variant="permanent">
        <Grid container justify="space-evenly" className={styles.menu}>
          <Grid item container>
            <Logo />
          </Grid>
          <Grid item container justify="center" direction="column">
            <SidebarButton href="/">Home</SidebarButton>
            <SidebarButton href="/blog">Blog</SidebarButton>
            <SidebarButton href="/about">About me</SidebarButton>
          </Grid>
          <Grid item container></Grid>
        </Grid>
      </Drawer>
    </>
  );
}
