import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme, Box, Divider, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles<Theme>((theme) => ({
  text: {
    fontFamily: "'Fira Mono', monospace",
    fontWeight: 300,
    lineHeight: 1.7,
    opacity: 0.85,
    fontSize: '0.75rem',
    userSelect: 'none',
    color: theme.palette.secondary.contrastText,
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.secondary.light,
  },
}));

function SidebarFooterText(): JSX.Element {
  const styles = useStyles();

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Box pt={1} pb={1}>
          <Divider />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box pt={1} pb={1.5}>
          <Typography
            variant="subtitle2"
            align="center"
            className={styles.text}
          >
            Made by{' '}
            <a
              href={process.env.NX_PUBLIC_LINKED_IN_URL}
              rel="noreferrer"
              target="_blank"
              className={styles.link}
            >
              Michał Buńkowski
            </a>
            <br />
            using{' '}
            <a
              href={process.env.NX_PUBLIC_NEXT_URL}
              rel="noreferrer"
              target="_blank"
              className={styles.link}
            >
              Next.js
            </a>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SidebarFooterText;
