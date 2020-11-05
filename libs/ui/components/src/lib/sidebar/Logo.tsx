import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Box, Theme, Typography } from '@material-ui/core';

import cn from 'classnames';

const useStyles = makeStyles<Theme>((theme) => ({
  logo: {
    fontFamily: "'Fira Mono', monospace",
    fontWeight: 500,
    fontSize: '1.125rem',
    userSelect: 'none',
    color: theme.palette.secondary.light,
  },
  incentive: {
    '&::after': {
      content: "'_'",
      display: 'inline-block',
      animation: '$blink 750ms infinite',
    },
  },
  '@keyframes blink': {
    '0%': {
      opacity: 0,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0,
    },
  },
}));

const logo = 'orochizu@web-dev:~$';

export function Logo(): JSX.Element {
  const styles = useStyles();
  const [text, setText] = useState<string>('');

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index >= logo.length) {
        return clearInterval(interval);
      }

      setText((prev) => prev + logo.charAt(index));
      index++;
    }, 50);

    return (): void => setText('');
  }, []);

  return (
    <Box pt={1.25} pb={1.25} pl={1} pr={1}>
      <Typography
        variant="subtitle1"
        color="textPrimary"
        className={cn(styles.logo, {
          [styles.incentive]: logo === text,
        })}
      >
        {text}
      </Typography>
    </Box>
  );
}
