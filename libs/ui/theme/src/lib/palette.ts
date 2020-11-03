import { PaletteColor } from '@material-ui/core/styles/createPalette';

interface Palette {
  graphite: PaletteColor;
  rustyBrown: PaletteColor;
}

export const palette: Palette = {
  graphite: {
    light: '#576172',
    dark: '#051120',
    main: '#2d3747',
    contrastText: '#fff',
  },
  rustyBrown: {
    light: '#f88a64',
    dark: '#8b2d10',
    main: '#c15b39',
    contrastText: '#fff',
  },
};
