const backdrop = {
  MuiBackdrop: {
    styleOverrides: {
      root: {
        // Keep the backdrop visually invisible but interactive, so clicking
        // outside a drawer/modal still triggers its onClose. Using
        // `visibility: hidden` here disabled pointer events entirely.
        '&:not(.MuiBackdrop-invisible)': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
};

export default backdrop;
