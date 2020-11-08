import React from 'react';
import firebase from 'firebase';
import { Grid, Link, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cn from 'classnames';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    padding: '8px 11px',
  },
  text: {
    fontFamily: "'Fira Mono', monospace",
    fontWeight: 300,
    lineHeight: 1.7,
    fontSize: '0.75rem',
    color: theme.palette.secondary.contrastText,
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.secondary.light,
  },
}));

interface Props {
  user: firebase.User;
  onSignIn: () => void;
  onSingOut: () => void;
}

function SidebarAuth(props: Props): JSX.Element {
  const { user, onSignIn, onSingOut } = props;

  const styles = useStyles();

  let content = (
    <Grid item xs={12}>
      <Link className={cn(styles.text, styles.link)} onClick={onSignIn}>
        Sign In
      </Link>
    </Grid>
  );

  if (user) {
    content = (
      <>
        <Typography variant="subtitle2" className={styles.text}>
          {user.email}
        </Typography>
        <Grid item xs={12}>
          <Link className={cn(styles.text, styles.link)} onClick={onSingOut}>
            Sign Out
          </Link>
        </Grid>
      </>
    );
  }

  return (
    <Grid container item justify="flex-start" className={styles.root}>
      {content}
    </Grid>
  );
}

export default SidebarAuth;
