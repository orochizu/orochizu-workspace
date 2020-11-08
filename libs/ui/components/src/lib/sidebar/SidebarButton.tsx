import React, { PropsWithChildren } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles<Theme>((theme) => ({
  grid: {
    flexBasis: 0,
  },
  anchor: {
    textDecoration: 'none',
  },
  button: {
    fontFamily: "'Fira Mono', monospace",
    fontWeight: 500,
    textAlign: 'left',
    borderRadius: 0,
    fontSize: '1.125rem',
    color: theme.palette.secondary.light,
  },
  label: {
    justifyContent: 'left',
  },
}));

interface Props {
  href: string;
  onClick?: () => void;
}

function SidebarButton(props: PropsWithChildren<Props>): JSX.Element {
  const { href, onClick, children } = props;
  const { grid, anchor, button, label } = useStyles();

  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Grid item xs={12} className={grid}>
      <Box pt={1.25} pb={1.25}>
        <Link href={href}>
          <a className={anchor}>
            <Button
              size="large"
              color="secondary"
              classes={{ label }}
              className={button}
              startIcon={isActive && <KeyboardArrowRightIcon />}
              onClick={onClick}
              fullWidth
            >
              {children}
            </Button>
          </a>
        </Link>
      </Box>
    </Grid>
  );
}

export default SidebarButton;
