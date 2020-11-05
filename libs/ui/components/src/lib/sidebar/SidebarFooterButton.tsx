import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Theme } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme) => ({
  icon: {
    color: theme.palette.secondary.light,
  },
  anchor: {
    textDecoration: 'none',
  },
}));

interface Props {
  href: string;
}

function SidebarFooterButton(props: PropsWithChildren<Props>): JSX.Element {
  const styles = useStyles();
  return (
    <Grid container justify="center" item xs={3}>
      <a
        href={props.href}
        rel="noreferrer"
        target="_blank"
        className={styles.anchor}
      >
        <IconButton className={styles.icon}>{props.children}</IconButton>
      </a>
    </Grid>
  );
}

export default SidebarFooterButton;
