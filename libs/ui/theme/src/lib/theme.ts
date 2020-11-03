import { createMuiTheme } from '@material-ui/core';
import { palette } from './palette';

export const theme = createMuiTheme({
  palette: {
    primary: palette.graphite,
    secondary: palette.rustyBrown,
  },
});

theme.overrides = {
  MuiDrawer: {
    paper: {
      width: 'inherit',
      background: theme.palette.primary.main,
    },
    root: {
      width: 250,
    },
  },
};
