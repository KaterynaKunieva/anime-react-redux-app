import CircularProgressMUI from '@mui/material/CircularProgress';
import React from 'react';
import useTheme from 'misc/hooks/useTheme';

function Loader({
  size = 24,
}) {
  const { theme } = useTheme();
  return (
      <CircularProgressMUI
          size={size}
          sx={{
            colorPrimary: theme.circularProgress.color,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) !important',
          }}
          thickness={3}
      />
  );
}

export default Loader;
