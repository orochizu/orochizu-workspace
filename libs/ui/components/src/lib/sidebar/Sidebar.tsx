import React from 'react';

import { Drawer, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useWidth } from '@orochizu-workspace/utils/hooks';
import { NavigationLink } from '@orochizu-workspace/types';

import { Logo } from './Logo';
import { SidebarButton } from './SidebarButton';

const useStyles = makeStyles(() => ({
  menu: {
    height: '100%',
  },
}));

interface Props {
  paths: NavigationLink[];
}

export function Sidebar(props: Props): JSX.Element {
  const { paths } = props;

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
            {paths.map(({ path, name }) => (
              <SidebarButton href={path}>{name}</SidebarButton>
            ))}
          </Grid>
          <Grid item container></Grid>
        </Grid>
      </Drawer>
    </>
  );
}
