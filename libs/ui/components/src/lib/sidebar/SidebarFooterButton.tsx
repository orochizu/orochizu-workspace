import React, { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, IconButton, Theme } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

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

function SidebarFooterButton(props: PropsWithChildren<Props>) {
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
